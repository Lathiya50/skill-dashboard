import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateTotalExperience(workEx) {
  if (!workEx?.length) return 0;

  const totalMonths = workEx.reduce((total, work) => {
    const start = new Date(work.start_date);
    const end = new Date(work.end_date);
    return (
      total +
      ((end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()))
    );
  }, 0);

  return Math.round((totalMonths / 12) * 10) / 10;
}

export function extractSkillsData(userData) {
  const skillsets = userData?.data?.data?.skillset || [];
  const skillsMap = new Map();

  skillsets.forEach((skillset) => {
    skillset.skills?.forEach((skill) => {
      skillsMap.set(skill.name, skill.pos?.[0]?.consensus_score || 0);
    });
  });

  return skillsMap;
}

export function getSkillLevel(user, skillName) {
  const skillsets = user?.data?.data?.skillset || [];
  for (const skillset of skillsets) {
    for (const skill of skillset.skills || []) {
      if (skill.name === skillName) {
        return skill.pos?.[0]?.consensus_score || 0;
      }
    }
  }
  return 0;
}
