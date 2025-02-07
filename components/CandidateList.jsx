import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CandidateList({ users, selectedUsers, onUserSelect }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most recommended</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => onUserSelect(user)}
              className={`flex items-center p-2 cursor-pointer rounded hover:bg-gray-50 transition-colors ${
                selectedUsers.find((u) => u.id === user.id) ? "bg-gray-100" : ""
              }`}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <span className="ml-2">{user.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
