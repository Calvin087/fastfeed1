import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import fetcher from "@/utils/fetcher";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import useSWR from "swr";
import SiteTable from "@/components/SiteTable";
import SiteTableHeader from "@/components/SiteTableHeader";

const Dashboard = () => {
    const { user } = useAuth();
    const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
    // passing SWR two values, the api to call and a user token.

    if (!data) {
        return (
            <DashboardShell>
            <SiteTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <SiteTableHeader />
            {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
        </DashboardShell>
    );
};

export default Dashboard;
