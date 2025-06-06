
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedDashboardOverview } from "@/components/EnhancedDashboardOverview";
import { EnhancedTransactionForm } from "@/components/EnhancedTransactionForm";
import { EnhancedTransactionList } from "@/components/EnhancedTransactionList";
import { BankMatching } from "@/components/BankMatching";
import { EnhancedReportsSection } from "@/components/EnhancedReportsSection";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { useTransactions } from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const {
    transactions,
    loading: transactionsLoading, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
  } = useTransactions();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">MAGA BUDGET PRO</h1>
          <p className="text-sm sm:text-base text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">MAGA BUDGET PRO</h1>
          <p className="text-sm sm:text-base text-gray-600">Great budgets start with great planning</p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-xs sm:text-sm text-gray-600">Welcome, {user.email}</span>
            <Button
              onClick={async () => {
                try {
                  await signOut();
                } catch (error) {
                  console.error("Logout failed:", error);
                  toast({
                    title: "Logout Failed",
                    description: "Could not log out. Please try again.",
                    variant: "destructive",
                  });
                }
              }}
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>

        {transactionsLoading ? (
          <div className="text-center py-8">
            <p className="text-base sm:text-lg text-gray-600">Loading your transactions...</p>
          </div>
        ) : (
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-white shadow-sm">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="add">Add Transaction</TabsTrigger>
              <TabsTrigger value="transactions">View Transactions</TabsTrigger>
              <TabsTrigger value="bank-matching">Bank Matching</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <EnhancedDashboardOverview transactions={transactions} />
            </TabsContent>

            <TabsContent value="add">
              <EnhancedTransactionForm onAddTransaction={addTransaction} />
            </TabsContent>

            <TabsContent value="transactions">
              <EnhancedTransactionList 
                transactions={transactions}
                onUpdateTransaction={updateTransaction}
                onDeleteTransaction={deleteTransaction}
              />
            </TabsContent>

            <TabsContent value="bank-matching">
              <BankMatching 
                transactions={transactions}
                onUpdateTransaction={updateTransaction}
              />
            </TabsContent>

            <TabsContent value="reports">
              <EnhancedReportsSection transactions={transactions} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;
