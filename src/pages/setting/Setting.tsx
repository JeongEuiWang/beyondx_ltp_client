import { PageHeader } from "@/shared/components";
import { PageBoundary } from "@/widget/_suspense";
import UserInfo from "@/widget/user/UserInfo";
import AddressBookList from "@/widget/user/AddressBookList";

const Setting = () => {
  return (
    <PageBoundary>
      <div className="mx-auto">
        <PageHeader title="User Settings" />
        <div className="space-y-6">
          <UserInfo />
          <AddressBookList />
        </div>
      </div>
    </PageBoundary>
  );
};

export default Setting;
