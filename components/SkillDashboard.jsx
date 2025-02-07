"use client";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import CandidateList from "./CandidateList";
import SkillsComparison from "./SkillsComparison";
import { fetchUsers, fetchUserData } from "@/lib/api";
import { extractSkillsData } from "@/lib/utils";

export default function SkillDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleUserSelect = async (user) => {
    if (selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      const userData = await fetchUserData(user.id);
      setSelectedUsers([...selectedUsers, userData]);

      const skillsMap = extractSkillsData(userData);
      const newSkills = Array.from(skillsMap.keys());
      setSkills([...new Set([...skills, ...newSkills])]);
    }
  };

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      data.slice(0, 3).forEach((user) => handleUserSelect(user));
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex items-center mb-4">
        <ChevronLeft className="w-6 h-6" />
        <span className="ml-2 text-lg">Back to My Jobs</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-2xl mb-4">Posk_UXdesigner_sr001</div>
        <div>{users.length} Candidates</div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/4">
          <CandidateList
            users={users}
            selectedUsers={selectedUsers}
            onUserSelect={handleUserSelect}
          />
        </div>

        <div className="w-3/4">
          <SkillsComparison
            selectedUsers={selectedUsers}
            skills={skills}
            selectedSkills={selectedSkills}
            onSkillChange={setSelectedSkills}
          />
        </div>
      </div>
    </div>
  );
}
