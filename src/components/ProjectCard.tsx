import { ProgressBar } from "./ProgressBar";

interface ProjectCardProps {
  title: string;
  description: string;
  location: string;
  budget: string;
  status: string;
  progress: number;
}

export function ProjectCard({ title, description, location, budget, status, progress }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-2">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <div className="text-xs text-gray-500">Location: {location}</div>
      <div className="text-xs text-gray-500">Budget: {budget}</div>
      <div className="text-xs text-gray-500">Status: {status}</div>
      <ProgressBar value={progress} />
    </div>
  );
} 