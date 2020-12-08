import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import fetcher from "@/utils/fetcher";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import useSWR from "swr";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";

const MyFeedback = () => {
    const { user } = useAuth();
    const { data } = useSWR(user ? ["/api/feedback", user.token] : null, fetcher);
    // passing SWR two values, the api to call and a user token.

    if (!data) {
        return (
            <DashboardShell>
            <FeedbackTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <FeedbackTableHeader />
            {data.feedback ? (
                <FeedbackTable allFeedback={data.feedback} />
            ) : (
                <EmptyState />
            )}
        </DashboardShell>
    );
};

export default MyFeedback;
