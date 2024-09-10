"use client";
import { useState } from "react";
import ServicessCard from "@/app/components/cards/ServiceCard";
import { MdOutlineCode, MdAppShortcut } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import PageTitle from "@/app/components/typography/PageTitle";
import Button from "@/app/components/display/Button";

interface Service {
  icon: React.ReactNode;
  service_title: string;
  service_details: string;
}

const initialServices: Service[] = [
  {
    icon: <MdOutlineCode className="text-2xl lg:text-5xl" color="#FFFFFF" />,
    service_title: "Front-End Development",
    service_details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?",
  },
  {
    icon: <MdAppShortcut className="text-2xl lg:text-5xl" color="#FFFFFF" />,
    service_title: "Mobile App Development",
    service_details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?",
  },
  {
    icon: (
      <SiMaterialdesignicons className="text-2xl lg:text-5xl" color="#FFFFFF" />
    ),
    service_title: "UI/UX Design",
    service_details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?",
  },
];

const ServiceEdit = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [newService, setNewService] = useState<Service>({
    icon: <MdOutlineCode className="text-2xl lg:text-5xl" color="#FFFFFF" />,
    service_title: "",
    service_details: "",
  });

  const handleEditClick = (index: number) => {
    setIsEditing(true);
    setCurrentEditIndex(index);
    setNewService(services[index]);
  };

  const handleSaveClick = () => {
    if (currentEditIndex !== null) {
      const updatedServices = [...services];
      updatedServices[currentEditIndex] = newService;
      setServices(updatedServices);
    } else {
      setServices([...services, newService]);
    }
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  const handleAddNewService = () => {
    setNewService({
      icon: <MdOutlineCode className="text-2xl lg:text-5xl" color="#FFFFFF" />,
      service_title: "",
      service_details: "",
    });
    setIsEditing(true);
    setCurrentEditIndex(null);
  };

  return (
    <div className="w-full py-10 px-6 md:px-10 min-h-screen flex flex-col items-center">
      <PageTitle name="Services" />
      
      <div className="w-full flex flex-col md:flex-row justify-center gap-6 my-16">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <ServicessCard
              icon={service.icon}
              service_title={service.service_title}
              service_details={service.service_details}
            />
            <Button
              onClick={() => handleEditClick(index)}
              theme="secondary"
              className="w-[100px] mt-2"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={handleAddNewService}
        theme="primary"
      >
        Add New Service
      </Button>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-[#111111] p-6 rounded-2xl shadow-md shadow-cyan-900 w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {currentEditIndex !== null ? "Edit Service" : "Add New Service"}
            </h2>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Service Title</label>
              <input
                type="text"
                value={newService.service_title}
                onChange={(e) =>
                  setNewService({ ...newService, service_title: e.target.value })
                }
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Service Details</label>
              <textarea
                value={newService.service_details}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    service_details: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-black"
                rows={4}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleCancelClick}
                theme="secondary"
                className="w-[100px]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveClick}
                theme="primary"
                className="w-[100px]"
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

export default ServiceEdit;
