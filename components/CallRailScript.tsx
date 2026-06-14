import Script from 'next/script';

// Fallback swap script path used until NEXT_PUBLIC_CALLRAIL_POOL is configured
const DEFAULT_SWAP_PATH = '7c0f00bcdefbd51029d3/12';

/**
 * Loads CallRail's Dynamic Number Insertion (swap.js) script. All pages
 * (FL and NC) share a single "organic" pool for now — configure
 * NEXT_PUBLIC_CALLRAIL_POOL with the "swap script" path (e.g. "abc123def456/12")
 * from that pool's CallRail tracking snippet. Falls back to DEFAULT_SWAP_PATH
 * until set.
 */
export default function CallRailScript() {
  const accountId = process.env.NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID;
  if (!accountId) return null;

  const swapPath = process.env.NEXT_PUBLIC_CALLRAIL_POOL || DEFAULT_SWAP_PATH;

  return (
    <Script
      src={`//cdn.callrail.com/companies/${accountId}/${swapPath}/swap.js`}
      strategy="afterInteractive"
    />
  );
}
