import { CheckCircle, Award, Zap, Search } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: Award,
      label: 'Licensed & Insured',
      description: 'CGC1527726',
    },
    {
      icon: Search,
      label: 'South Florida Specialists',
      description: '15+ years experience',
    },
    {
      icon: CheckCircle,
      label: 'Free Inspections',
      description: 'No obligation assessment',
    },
    {
      icon: Zap,
      label: 'Fast Turnaround',
      description: 'Same-day estimates',
    },
  ];

  return (
    <div className="bg-brand-gray-light border-y border-gray-200">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <Icon className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-brand-dark">{item.label}</h4>
                  <p className="text-sm text-brand-gray">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
