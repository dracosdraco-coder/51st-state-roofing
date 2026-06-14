// ============================================================
// 51st State Construction — Google Sheets Marketing Hub
//
// HOW TO USE:
// 1. Open your Google Sheet
// 2. Extensions → Apps Script
// 3. Delete any existing code and paste this entire file
// 4. Run setScriptProperties() once (fill in your IDs first)
// 5. Run setupTriggers() once
// 6. Run buildDashboard() once
// 7. Run buildIntakeScript() once
// 8. Deploy → Manage deployments → update your existing web app
//    (Execute as: Me | Access: Anyone)
//
// SHEETS THIS CREATES:
//   Dashboard     — live summary with formulas & charts
//   Leads         — website form submissions (real-time webhook)
//   Phone Calls   — CallRail call events (real-time webhook)
//   Site Traffic  — GA4 sessions by source (pulled daily at 7 AM)
//   Ad Campaigns  — Google Ads campaign stats (pulled daily at 7 AM)
//   Intake Script — editable CSR call/form intake Q&A template
//
// ADMIN NOTIFICATIONS:
//   New leads and calls trigger an email to adminfl@51ststateconstruction.com
//   or adminnc@51ststateconstruction.com based on the lead/call market.
//   Configure recipients and enable/disable via setScriptProperties().
// ============================================================

// ============================================================
// ROUTING — receives POST from Next.js /api/leads and
//           /api/callrail-webhook
// ============================================================
function doPost(e) {
  try {
    var raw = e.postData ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    if (data.type === 'call') {
      writeCall(data);
    } else {
      writeLead(data);
    }

    return ok();
  } catch (err) {
    console.error('doPost error:', err.message);
    return errResponse(err.message);
  }
}

// ============================================================
// HELPERS
// ============================================================
function getSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    var header = sheet.getRange(1, 1, 1, headers.length);
    header.setValues([headers]);
    header.setFontWeight('bold')
          .setBackground('#1a73e8')
          .setFontColor('#ffffff')
          .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function ok() {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function errResponse(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

function str(v) { return v || ''; }
function num(v) { return parseInt(v) || 0; }

// ============================================================
// ADMIN EMAIL NOTIFICATIONS
// Routes a short notification email to the right market admin
// (adminfl@ / adminnc@51ststateconstruction.com) on every new lead
// or call. Configure recipients via setScriptProperties().
// ============================================================
function getAdminEmail(market) {
  var props = PropertiesService.getScriptProperties();
  if (market === 'NC') {
    return props.getProperty('ADMIN_EMAIL_NC') || 'adminnc@51ststateconstruction.com';
  }
  return props.getProperty('ADMIN_EMAIL_FL') || 'adminfl@51ststateconstruction.com';
}

function notificationsEnabled() {
  var flag = PropertiesService.getScriptProperties().getProperty('ADMIN_NOTIFICATIONS_ENABLED');
  return flag !== 'false'; // enabled by default
}

// Best-effort guess at market for calls, based on the page that
// generated the call (CallRail passes the landing/referring URL).
function guessMarketFromUrl(url) {
  return /north-carolina/i.test(str(url)) ? 'NC' : 'FL';
}

function notifyAdminLead(data) {
  if (!notificationsEnabled()) return;
  try {
    var market = str(data.locationMarket) === 'NC' ? 'NC' : 'FL';
    var to = getAdminEmail(market);
    var name = (str(data.firstName) + ' ' + str(data.lastName)).trim() || 'Unknown';
    var subject = 'New Lead (' + market + '): ' + name +
      (data.serviceType ? ' — ' + str(data.serviceType) : '');

    var body = [
      'A new lead was submitted on the website.',
      '',
      'Name: ' + name,
      'Email: ' + str(data.email),
      'Phone: ' + str(data.phone),
      'Service: ' + str(data.serviceType),
      'Market: ' + market,
      'Property Address: ' + str(data.propertyAddress),
      'Page: ' + str(data.pageSource),
      'Notes: ' + str(data.additionalNotes),
      '',
      'View the Leads tab for full details.'
    ].join('\n');

    MailApp.sendEmail(to, subject, body);
  } catch (err) {
    console.error('notifyAdminLead error:', err.message);
  }
}

function notifyAdminCall(data) {
  if (!notificationsEnabled()) return;
  try {
    var market = guessMarketFromUrl(data.landing_url || data.referring_url);
    var to = getAdminEmail(market);
    var answered = data.answered === true || data.answered === 'true' ? 'Answered' : 'Missed';
    var subject = 'New Call (' + market + '): ' + answered + ' — ' + str(data.caller_number);

    var body = [
      'A new call came in via CallRail.',
      '',
      'Caller: ' + str(data.caller_number),
      'Status: ' + answered,
      'Duration: ' + num(data.duration) + ' sec',
      'Market: ' + market,
      'Tracking Number: ' + str(data.tracking_number),
      'Source: ' + (str(data.source) || str(data.utm_source)),
      'Landing Page: ' + str(data.landing_url),
      '',
      'View the Phone Calls tab for full details.'
    ].join('\n');

    MailApp.sendEmail(to, subject, body);
  } catch (err) {
    console.error('notifyAdminCall error:', err.message);
  }
}

// ============================================================
// LEADS SHEET
// Written in real-time via /api/leads webhook
// ============================================================
function writeLead(data) {
  var sheet = getSheet('Leads', [
    'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone',
    'Service Type', 'Market', 'Property Address',
    'UTM Source', 'UTM Campaign', 'UTM Medium', 'UTM Content', 'UTM Term',
    'Page Source', 'Notes'
  ]);

  sheet.appendRow([
    str(data.submittedAt) || new Date().toISOString(),
    str(data.firstName),
    str(data.lastName),
    str(data.email),
    str(data.phone),
    str(data.serviceType),
    str(data.locationMarket),
    str(data.propertyAddress),
    str(data.utmSource),
    str(data.utmCampaign),
    str(data.utmMedium),
    str(data.utmContent),
    str(data.utmTerm),
    str(data.pageSource),
    str(data.additionalNotes)
  ]);

  notifyAdminLead(data);
}

// ============================================================
// PHONE CALLS SHEET
// Written in real-time via /api/callrail-webhook
// ============================================================
function writeCall(data) {
  var sheet = getSheet('Phone Calls', [
    'Timestamp', 'Caller Number', 'Duration (sec)', 'Answered',
    'Direction', 'Source', 'UTM Campaign', 'UTM Medium', 'UTM Term',
    'Landing URL', 'Tracking Number', 'Recording URL', 'Note'
  ]);

  sheet.appendRow([
    str(data.start_time) || new Date().toISOString(),
    str(data.caller_number),
    num(data.duration),
    data.answered === true || data.answered === 'true' ? 'Yes' : 'No',
    str(data.direction),
    str(data.source) || str(data.utm_source),
    str(data.utm_campaign),
    str(data.utm_medium),
    str(data.utm_term),
    str(data.landing_url),
    str(data.tracking_number),
    str(data.recording_player),
    str(data.note)
  ]);

  notifyAdminCall(data);
}

// ============================================================
// GA4 DAILY PULL
// Runs at 7 AM via time-based trigger.
// Requires: Google Analytics Data API enabled in Services panel
//
// HOW TO FIND YOUR PROPERTY ID:
//   GA4 → Admin → Property Settings → Property ID (numbers only)
// ============================================================
function pullGA4() {
  var props = PropertiesService.getScriptProperties();
  var propertyId = props.getProperty('GA4_PROPERTY_ID');
  if (!propertyId) {
    console.warn('GA4_PROPERTY_ID not set — run setScriptProperties() first');
    return;
  }

  var sheet = getSheet('Site Traffic', [
    'Date', 'Source / Medium', 'Sessions', 'Users', 'New Users',
    'Pageviews', 'Bounce Rate', 'Avg Session (s)'
  ]);

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var dateStr = Utilities.formatDate(yesterday, 'UTC', 'yyyy-MM-dd');

  // Skip if we already have this date
  var lastRow = sheet.getLastRow();
  if (lastRow > 1 && sheet.getRange(lastRow, 1).getValue() === dateStr) {
    console.log('GA4: ' + dateStr + ' already pulled, skipping');
    return;
  }

  var token = ScriptApp.getOAuthToken();
  var url = 'https://analyticsdata.googleapis.com/v1beta/properties/' + propertyId + ':runReport';

  var payload = JSON.stringify({
    dateRanges: [{ startDate: dateStr, endDate: dateStr }],
    dimensions: [{ name: 'sessionSourceMedium' }],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'screenPageViews' },
      { name: 'bounceRate' },
      { name: 'averageSessionDuration' }
    ],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 50
  });

  var res = UrlFetchApp.fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    payload: payload,
    muteHttpExceptions: true
  });

  if (res.getResponseCode() !== 200) {
    console.error('GA4 API error ' + res.getResponseCode() + ': ' + res.getContentText());
    return;
  }

  var result = JSON.parse(res.getContentText());
  (result.rows || []).forEach(function(row) {
    sheet.appendRow([
      dateStr,
      row.dimensionValues[0].value,
      parseInt(row.metricValues[0].value) || 0,
      parseInt(row.metricValues[1].value) || 0,
      parseInt(row.metricValues[2].value) || 0,
      parseInt(row.metricValues[3].value) || 0,
      (parseFloat(row.metricValues[4].value) * 100).toFixed(1) + '%',
      Math.round(parseFloat(row.metricValues[5].value))
    ]);
  });

  console.log('GA4 pull complete for ' + dateStr + ' (' + (result.rows || []).length + ' rows)');
}

// ============================================================
// GOOGLE ADS DAILY PULL
// Runs at 7 AM via time-based trigger.
//
// REQUIRES A DEVELOPER TOKEN from Google Ads MCC:
//   Google Ads → Tools → API Center → Developer token
//   (apply for standard access; test access works for your own account)
//
// ALTERNATIVE if you don't have a developer token:
//   In Google Ads → Reports → create a scheduled report
//   → Export to Google Sheets → choose this spreadsheet
//   Then rename that sheet to "Ad Campaigns" to match the Dashboard formulas.
// ============================================================
function pullGoogleAds() {
  var props = PropertiesService.getScriptProperties();
  var customerId = props.getProperty('GOOGLE_ADS_CUSTOMER_ID');
  var devToken   = props.getProperty('GOOGLE_ADS_DEVELOPER_TOKEN');

  if (!customerId || !devToken) {
    console.warn('Google Ads not configured — set GOOGLE_ADS_CUSTOMER_ID and GOOGLE_ADS_DEVELOPER_TOKEN via setScriptProperties()');
    return;
  }

  var sheet = getSheet('Ad Campaigns', [
    'Date', 'Campaign', 'Status', 'Impressions', 'Clicks',
    'CTR (%)', 'Cost ($)', 'Conversions', 'Cost/Conv ($)'
  ]);

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var dateStr   = Utilities.formatDate(yesterday, 'UTC', 'yyyy-MM-dd');
  var queryDate = Utilities.formatDate(yesterday, 'UTC', 'yyyyMMdd');

  var query = [
    'SELECT campaign.name, campaign.status,',
    'metrics.impressions, metrics.clicks, metrics.ctr,',
    'metrics.cost_micros, metrics.conversions, metrics.cost_per_conversion',
    'FROM campaign',
    "WHERE segments.date = '" + queryDate + "'",
    'AND metrics.impressions > 0',
    'ORDER BY metrics.cost_micros DESC'
  ].join(' ');

  var token = ScriptApp.getOAuthToken();
  var url = 'https://googleads.googleapis.com/v18/customers/' + customerId + '/googleAds:searchStream';

  var res = UrlFetchApp.fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'developer-token': devToken,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify({ query: query }),
    muteHttpExceptions: true
  });

  if (res.getResponseCode() !== 200) {
    console.error('Google Ads API error ' + res.getResponseCode() + ': ' + res.getContentText());
    return;
  }

  var batches = JSON.parse(res.getContentText());
  var count = 0;
  (batches || []).forEach(function(batch) {
    (batch.results || []).forEach(function(row) {
      var cost = (row.metrics.costMicros || 0) / 1e6;
      var cpc  = (row.metrics.costPerConversion || 0) / 1e6;
      sheet.appendRow([
        dateStr,
        row.campaign.name,
        row.campaign.status,
        row.metrics.impressions  || 0,
        row.metrics.clicks       || 0,
        ((row.metrics.ctr || 0) * 100).toFixed(2),
        cost.toFixed(2),
        (row.metrics.conversions || 0).toFixed(0),
        cpc > 0 ? cpc.toFixed(2) : '—'
      ]);
      count++;
    });
  });

  console.log('Google Ads pull complete for ' + dateStr + ' (' + count + ' campaigns)');
}

// ============================================================
// ONE-TIME SETUP FUNCTIONS
// ============================================================

// Step 1: Fill in your IDs here, then run this function once.
function setScriptProperties() {
  PropertiesService.getScriptProperties().setProperties({
    // GA4 Admin → Property Settings → Property ID (numeric, not G-XXXX)
    'GA4_PROPERTY_ID': 'REPLACE_WITH_NUMERIC_PROPERTY_ID',

    // Google Ads customer ID (10 digits, no dashes)
    'GOOGLE_ADS_CUSTOMER_ID': 'REPLACE_WITH_CUSTOMER_ID',

    // Google Ads → Tools → API Center → Developer token
    // Leave blank if using the native Ads → Sheets export instead
    'GOOGLE_ADS_DEVELOPER_TOKEN': 'REPLACE_WITH_DEV_TOKEN',

    // Admin notification recipients per market
    'ADMIN_EMAIL_FL': 'adminfl@51ststateconstruction.com',
    'ADMIN_EMAIL_NC': 'adminnc@51ststateconstruction.com',

    // Set to 'false' to pause new-lead/new-call emails without code changes
    'ADMIN_NOTIFICATIONS_ENABLED': 'true'
  });
  console.log('Script properties saved.');
}

// Step 2: Run this once to create daily triggers.
function setupTriggers() {
  // Remove any existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function(t) {
    ScriptApp.deleteTrigger(t);
  });

  ScriptApp.newTrigger('pullGA4')
    .timeBased()
    .everyDays(1)
    .atHour(7)
    .create();

  ScriptApp.newTrigger('pullGoogleAds')
    .timeBased()
    .everyDays(1)
    .atHour(7)
    .create();

  console.log('Daily triggers set: GA4 + Google Ads pull at 7 AM.');
}

// Step 3: Run this once to build the Dashboard tab.
function buildDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dash = ss.getSheetByName('Dashboard') || ss.insertSheet('Dashboard', 0);
  dash.clear();
  dash.clearFormats();

  // ---- Title ----
  dash.getRange('A1:H1').merge()
    .setValue('51st State Construction — Lead & Marketing Dashboard')
    .setFontSize(18)
    .setFontWeight('bold')
    .setBackground('#1a73e8')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center');

  // ---- THIS MONTH KPIs ----
  dash.getRange('A3').setValue('THIS MONTH').setFontWeight('bold').setFontSize(13);

  var kpis = [
    ['Total Leads',       '=COUNTIFS(Leads!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Leads!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['Total Calls',       "=COUNTIFS('Phone Calls'!A:A,\">=\"&DATE(YEAR(TODAY()),MONTH(TODAY()),1),'Phone Calls'!A:A,\"<=\"&EOMONTH(TODAY(),0))"],
    ['Answered Calls',    "=COUNTIFS('Phone Calls'!A:A,\">=\"&DATE(YEAR(TODAY()),MONTH(TODAY()),1),'Phone Calls'!A:A,\"<=\"&EOMONTH(TODAY(),0),'Phone Calls'!D:D,\"Yes\")"],
    ['Answer Rate',       '=IF(B5=0,"—",TEXT(B6/B5,"0%"))'],
    ['Missed Calls',      '=B5-B6'],
    ['Ad Spend',          "=IFERROR(SUMIFS('Ad Campaigns'!G:G,'Ad Campaigns'!A:A,\">=\"&DATE(YEAR(TODAY()),MONTH(TODAY()),1),'Ad Campaigns'!A:A,\"<=\"&EOMONTH(TODAY(),0)),\"—\")"],
    ['Ad Conversions',    "=IFERROR(SUMIFS('Ad Campaigns'!H:H,'Ad Campaigns'!A:A,\">=\"&DATE(YEAR(TODAY()),MONTH(TODAY()),1),'Ad Campaigns'!A:A,\"<=\"&EOMONTH(TODAY(),0)),\"—\")"],
    ['Cost per Lead',     '=IFERROR(IF(B10="—","—",IF(B4=0,"—",TEXT(B10/B4,"$#,##0.00"))),"—")']
  ];

  kpis.forEach(function(row, i) {
    var rowNum = i + 4;
    dash.getRange('A' + rowNum).setValue(row[0]).setFontWeight('bold');
    dash.getRange('B' + rowNum).setFormula(row[1]);
    if (row[0] === 'Ad Spend') {
      dash.getRange('B' + rowNum).setNumberFormat('$#,##0.00');
    }
  });

  // ---- RECENT LEADS ----
  dash.getRange('D3').setValue('RECENT LEADS (last 10)').setFontWeight('bold').setFontSize(13);
  var leadHeaders = ['Date', 'Name', 'Email', 'Phone', 'Service', 'UTM Source'];
  leadHeaders.forEach(function(h, i) {
    dash.getRange(4, 4 + i).setValue(h).setFontWeight('bold').setBackground('#f0f4ff');
  });
  // QUERY returns most recent 10 leads: timestamp, first+last name concat, email, phone, service, utm_source
  dash.getRange('D5').setFormula(
    '=IFERROR(QUERY(Leads!A:I,"SELECT A, B&\' \'&C, D, E, F, I ORDER BY A DESC LIMIT 10 LABEL B&\' \'&C \'\'",0),"")'
  );

  // ---- RECENT CALLS ----
  dash.getRange('D17').setValue('RECENT CALLS (last 10)').setFontWeight('bold').setFontSize(13);
  var callHeaders = ['Date', 'Caller', 'Duration', 'Answered', 'Source', 'Campaign'];
  callHeaders.forEach(function(h, i) {
    dash.getRange(18, 4 + i).setValue(h).setFontWeight('bold').setBackground('#f0f4ff');
  });
  dash.getRange('D19').setFormula(
    "=IFERROR(QUERY('Phone Calls'!A:G,\"SELECT A, B, C, D, F, G ORDER BY A DESC LIMIT 10\",0),\"\")"
  );

  // ---- TOP TRAFFIC SOURCES (last 30 days) ----
  dash.getRange('A14').setValue('TOP TRAFFIC SOURCES (last 30 days)').setFontWeight('bold').setFontSize(13);
  ['Source / Medium', 'Sessions'].forEach(function(h, i) {
    dash.getRange(15, 1 + i).setValue(h).setFontWeight('bold').setBackground('#f0f4ff');
  });
  dash.getRange('A16').setFormula(
    "=IFERROR(QUERY('Site Traffic'!A:C,\"SELECT B, SUM(C) WHERE A >= date '\"&TEXT(TODAY()-30,\"yyyy-MM-dd\")&\"' GROUP BY B ORDER BY SUM(C) DESC LIMIT 8 LABEL SUM(C) ''\",0),\"\")"
  );

  // Auto-resize columns
  dash.autoResizeColumns(1, 9);

  console.log('Dashboard built. Run pullGA4() and pullGoogleAds() manually to backfill data.');
}

// Step 4: Run this once to build the Intake Script tab.
// CSRs fill in / adjust the "Answer / Talking Point" and "Notes" columns
// after monitoring calls or reviewing form submissions, so every
// lead gets a consistent intake experience.
function buildIntakeScript() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Intake Script');
  if (sheet) {
    console.log('Intake Script tab already exists — leaving existing content as-is.');
    return;
  }
  sheet = ss.insertSheet('Intake Script');

  var headers = ['Question', 'Answer / Talking Point', 'Notes'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setFontWeight('bold')
    .setBackground('#1a73e8')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('left');
  sheet.setFrozenRows(1);

  var rows = [
    ['Greeting', 'Thank you for calling 51st State Construction, this is [name] — how can I help you today?', ''],
    ['Caller name', 'Can I get your full name?', ''],
    ['Best contact number', 'What\'s the best phone number to reach you at?', ''],
    ['Email address', 'And an email address for sending the estimate?', ''],
    ['Property address', 'What\'s the address of the property?', ''],
    ['Market / region', 'Is the property in Florida or North Carolina?', 'Routes lead to the correct CallRail pool & admin (adminfl@ / adminnc@51ststateconstruction.com)'],
    ['Service needed', 'What type of work are you looking to have done — roofing, siding/exterior, concrete restoration, or general contracting?', 'Map to serviceType: roofing / siding / concrete / commercial / general'],
    ['Project type detail', 'Roofing: TPO, metal, or flat? Siding: fiber cement, EIFS, stucco, or composite?', ''],
    ['Approximate size', 'Do you know roughly how many square feet the project covers?', 'Used for the online Estimator follow-up'],
    ['Timeline / urgency', 'Is this something you need addressed right away, or are you planning ahead?', 'Flag same-day vs. scheduled follow-up'],
    ['Decision maker', 'Are you the property owner, property manager, or board member?', ''],
    ['How did you hear about us', 'How did you hear about 51st State Construction?', 'Cross-check against UTM source/campaign in Leads tab'],
    ['Preferred contact method/time', 'Would you prefer a call, text, or email — and is there a best time to reach you?', ''],
    ['Closing', 'Great — I have everything I need. Our team will follow up within 24 hours with next steps. Is there anything else I can help with?', ''],
    ['Internal notes', '', 'CSR notes for this call/form — anything unusual, escalations, or follow-up reminders']
  ];
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sheet.getRange(2, 1, rows.length, 1).setFontWeight('bold');

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 480);
  sheet.setColumnWidth(3, 320);
  for (var r = 2; r <= rows.length + 1; r++) {
    sheet.setRowHeight(r, 60);
  }
  sheet.getRange(2, 1, rows.length, headers.length).setWrap(true).setVerticalAlignment('top');

  console.log('Intake Script tab created with baseline Q&A. Edit freely — this sheet is never overwritten automatically.');
}

// ============================================================
// BACKFILL — run manually to pull historical data for any
// date range (max 60 days recommended per run)
// ============================================================
function backfillGA4(startDate, endDate) {
  // Usage: backfillGA4('2025-05-01', '2025-05-31')
  // Or just run it with no args to pull the last 30 days
  var props = PropertiesService.getScriptProperties();
  var propertyId = props.getProperty('GA4_PROPERTY_ID');
  if (!propertyId) { console.warn('GA4_PROPERTY_ID not set'); return; }

  var start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 86400000);
  var end   = endDate   ? new Date(endDate)   : new Date(Date.now() - 86400000);

  var sheet = getSheet('Site Traffic', [
    'Date', 'Source / Medium', 'Sessions', 'Users', 'New Users',
    'Pageviews', 'Bounce Rate', 'Avg Session (s)'
  ]);

  var token = ScriptApp.getOAuthToken();
  var s = Utilities.formatDate(start, 'UTC', 'yyyy-MM-dd');
  var e = Utilities.formatDate(end,   'UTC', 'yyyy-MM-dd');

  var payload = JSON.stringify({
    dateRanges: [{ startDate: s, endDate: e }],
    dimensions: [{ name: 'date' }, { name: 'sessionSourceMedium' }],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'screenPageViews' },
      { name: 'bounceRate' },
      { name: 'averageSessionDuration' }
    ],
    orderBys: [
      { dimension: { dimensionName: 'date' }, desc: false },
      { metric: { metricName: 'sessions' }, desc: true }
    ],
    limit: 5000
  });

  var url = 'https://analyticsdata.googleapis.com/v1beta/properties/' + propertyId + ':runReport';
  var res = UrlFetchApp.fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    payload: payload,
    muteHttpExceptions: true
  });

  if (res.getResponseCode() !== 200) {
    console.error('GA4 backfill error:', res.getContentText());
    return;
  }

  var result = JSON.parse(res.getContentText());
  (result.rows || []).forEach(function(row) {
    var rawDate = row.dimensionValues[0].value; // YYYYMMDD
    var fmtDate = rawDate.slice(0,4) + '-' + rawDate.slice(4,6) + '-' + rawDate.slice(6,8);
    sheet.appendRow([
      fmtDate,
      row.dimensionValues[1].value,
      parseInt(row.metricValues[0].value) || 0,
      parseInt(row.metricValues[1].value) || 0,
      parseInt(row.metricValues[2].value) || 0,
      parseInt(row.metricValues[3].value) || 0,
      (parseFloat(row.metricValues[4].value) * 100).toFixed(1) + '%',
      Math.round(parseFloat(row.metricValues[5].value))
    ]);
  });

  console.log('GA4 backfill complete: ' + s + ' → ' + e + ' (' + (result.rows || []).length + ' rows)');
}
