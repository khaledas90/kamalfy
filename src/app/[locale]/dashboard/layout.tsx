import { FC, PropsWithChildren } from "react";
import Client from "./Client";
import { Permission } from "@/store/api/user/user";

const DashboardLayout: FC<PropsWithChildren> = async ({
  children,
}: Readonly<PropsWithChildren>) => {
  // Mock screens data for testing with all permissions enabled
  const mockScreens = {
    screens: {
      Dashboard: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      "Patient Management": { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Patients: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Appointments: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      "Medical Departments": { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Cardiology: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Neurology: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Ophthalmology: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Orthopedics: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Pediatrics: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      "Medical Records": { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      "Record Categories": { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Settings: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
      Notifications: { canAdd: true, canView: true, canUpdate: true, canDelete: true },
    }
  };

  return (
    <Client screens={mockScreens as unknown as Permission}>
      {/* <LoadingOverlay /> */}
      {children}
    </Client>
  );
};

export default DashboardLayout;
