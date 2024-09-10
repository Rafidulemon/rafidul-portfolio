"use client";
import { useState } from 'react';
import SkillBar from '@/app/components/animations/SkillBar';
import PageTitle from '@/app/components/typography/PageTitle';
import Button from '@/app/components/display/Button';

interface Skill {
  label: string;
  level: number;
}

const initialSkills: Skill[] = [
  { label: 'JavaScript', level: 80 },
  { label: 'React', level: 75 },
  { label: 'Node.js', level: 70 },
  { label: 'CSS', level: 85 },
];

const SkillEdit = () => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [editedSkill, setEditedSkill] = useState<Skill>({ label: '', level: 0 });

  const handleEditClick = (index: number) => {
    setIsEditing(true);
    setCurrentEditIndex(index);
    setEditedSkill(skills[index]);
  };

  const handleSaveClick = () => {
    if (currentEditIndex !== null) {
      const updatedSkills = [...skills];
      updatedSkills[currentEditIndex] = editedSkill;
      setSkills(updatedSkills);
      setIsEditing(false);
      setCurrentEditIndex(null);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  return (
    <div className="w-full py-10 px-6 md:px-10 min-h-screen flex flex-col items-center">
      <PageTitle name="Skills" />

      {skills.map((skill, index) => (
        <div key={index} className="my-6 w-1/2">
          <SkillBar label={skill.label} level={skill.level} />
          <Button theme='secondary'
            onClick={() => handleEditClick(index)}
            className='w-[100px]'
          >
            Edit
          </Button>
        </div>
      ))}
      <Button theme='primary' className='my-6 w-[200px]'>
        Add New Skill
      </Button>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-[#111111] p-6 rounded-2xl shadow-md shadow-cyan-900 w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Skill</h2>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Skill Label</label>
              <input
                type="text"
                value={editedSkill.label}
                onChange={(e) =>
                  setEditedSkill({ ...editedSkill, label: e.target.value })
                }
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Skill Level (%)</label>
              <input
                type="number"
                value={editedSkill.level}
                onChange={(e) =>
                  setEditedSkill({ ...editedSkill, level: +e.target.value })
                }
                className="w-full px-3 py-2 border rounded text-black"
                min="0"
                max="100"
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleCancelClick}
                theme='secondary'
                className='w-[100px]'
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveClick}
                theme='primary'
                className='w-[100px]'
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillEdit;
