
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Check, X } from "lucide-react";
import { Transaction } from "@/hooks/useTransactions";

interface TransactionListProps {
  transactions: Transaction[];
  onUpdateTransaction: (id: string, updates: Partial<Transaction>) => void;
  onDeleteTransaction: (id: string) => void;
}

export const EnhancedTransactionList = ({ 
  transactions, 
  onUpdateTransaction, 
  onDeleteTransaction 
}: TransactionListProps) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  const categories = [...new Set(transactions.map(t => t.category))];

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditAmount(transaction.amount.toString());
  };

  const handleSaveEdit = (id: string) => {
    onUpdateTransaction(id, { amount: parseFloat(editAmount) });
    setEditingId(null);
    setEditAmount('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditAmount('');
  };

  const toggleReconciled = (id: string, currentStatus: boolean) => {
    onUpdateTransaction(id, { is_reconciled: !currentStatus });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-base sm:text-lg">No transactions found</p>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'} className="text-xs sm:text-sm">
                      {transaction.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm">{transaction.category}</Badge>
                    <Badge variant={transaction.is_reconciled ? 'default' : 'secondary'} className="text-xs sm:text-sm">
                      {transaction.is_reconciled ? 'Matched' : 'Unmatched'}
                    </Badge>
                  </div>
                  <p className="font-medium text-sm sm:text-base">{transaction.description}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
                  {editingId === transaction.id ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-24 text-sm sm:text-base"
                      />
                      <Button size="sm" onClick={() => handleSaveEdit(transaction.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'} text-sm sm:text-base`}>
                        ₹{transaction.amount.toLocaleString()}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleReconciled(transaction.id, transaction.is_reconciled || false)}
                        className="text-xs sm:text-sm"
                      >
                        {transaction.is_reconciled ? 'Mark Unmatched' : 'Mark Matched'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(transaction)} className="text-xs sm:text-sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeleteTransaction(transaction.id)}
                        className="text-xs sm:text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
