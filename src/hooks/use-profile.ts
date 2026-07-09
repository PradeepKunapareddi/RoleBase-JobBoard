import { useLocalStorage } from "./use-local-storage";

export interface Education {
  id: string;
  degree: string;
  university: string;
  specialization: string;
  startYear: string;
  endYear: string;
  grade: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface UserProfile {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  skills: string[];
  languages: string[];
  portfolio: string;
  github: string;
  linkedin: string;
  resumeName: string;
  photo: string;
}

const defaultProfile: UserProfile = {
  name: "", headline: "", email: "", phone: "", location: "",
  about: "", skills: [], languages: [], portfolio: "", github: "",
  linkedin: "", resumeName: "", photo: "",
};

export function useProfile() {
  const [profile, setProfile] = useLocalStorage<UserProfile>("jb.profile", defaultProfile);
  const [education, setEducation] = useLocalStorage<Education[]>("jb.education", []);
  const [experience, setExperience] = useLocalStorage<Experience[]>("jb.experience", []);

  const completion = (() => {
    let score = 0;
    if (profile.photo) score += 15;
    if (profile.name) score += 10;
    if (profile.headline) score += 10;
    if (profile.about) score += 10;
    if (profile.resumeName) score += 15;
    if (profile.skills.length > 0) score += 10;
    if (education.length > 0) score += 15;
    if (experience.length > 0) score += 15;
    return score;
  })();

  return { profile, setProfile, education, setEducation, experience, setExperience, completion };
}
