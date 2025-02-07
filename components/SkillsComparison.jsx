import Select from "react-select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SKILL_LEVEL_COLORS } from "@/constants/colors";
import { calculateTotalExperience, getSkillLevel } from "@/lib/utils";

export default function SkillsComparison({
  selectedUsers,
  skills,
  selectedSkills,
  onSkillChange,
}) {
  const skillOptions = skills.map((skill) => ({ value: skill, label: skill }));
  const filteredSkills = skills.filter(
    (skill) =>
      selectedSkills.length === 0 ||
      selectedSkills.some((s) => s.value === skill)
  );

  console.log("selectedUsers", selectedUsers);
  return (
    <Card>
      <CardHeader className=" flex flex-col gap-2 pb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Compare View
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
              Individual view
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
              Shortlisted candidates
            </button>
          </div>
          <div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="w-64">
          <Select
            isMulti
            options={skillOptions}
            value={selectedSkills}
            onChange={onSkillChange}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Filter by skills..."
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Skills</th>
              </tr>
              {selectedUsers.length > 0 && (
                <tr>
                  <td className="text-left p-2">Experiences</td>
                  {selectedUsers.map((user) => (
                    <th>
                      <span>{user?.name?.slice(0, 2)}</span>
                      <div
                        key={user.id}
                        className="w-6 h-6 rounded mx-auto text-sm bg-gray-200 space-x-1"
                      >
                        {calculateTotalExperience(user.user?.workEx)}
                      </div>
                    </th>
                  ))}
                </tr>
              )}
            </thead>

            <tbody>
              {selectedUsers.length === 0 ? (
                <tr>
                  <td colSpan={selectedUsers.length + 1}>
                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                      <p className="text-gray-500 text-lg">
                        No candidates selected for comparison
                      </p>
                      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        Select Candidates to Compare
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSkills.map((skill) => (
                  <tr key={skill}>
                    <td className="p-2">{skill}</td>
                    {selectedUsers.map((user) => {
                      const skillLevel = getSkillLevel(user, skill);
                      return (
                        <td key={`${user.id}-${skill}`} className="p-2">
                          <div
                            style={{
                              backgroundColor: SKILL_LEVEL_COLORS[skillLevel],
                            }}
                            className="w-8 h-8 rounded mx-auto"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
