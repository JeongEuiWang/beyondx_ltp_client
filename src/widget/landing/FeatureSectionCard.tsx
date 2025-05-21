import { ReactElement } from 'react';

interface FeatureSectionCardProps {
  icon: ReactElement;
  index: string;
  title: string;
  description: string;
}

export default function FeatureSectionCard({ icon, index, title, description }: FeatureSectionCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="flex items-center justify-center w-10 h-10 mb-6 rounded-lg bg-blue-100 text-blue-600">
        {icon}
      </div>
      <div className="text-sm text-blue-500 mb-2">{index}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
} 