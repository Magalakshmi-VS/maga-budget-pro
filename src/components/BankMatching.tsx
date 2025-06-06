
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { Transaction } from "@/hooks/useTransactions";
import { useToast } from "@/hooks/use-toast";

interface BankMatchingProps {
  transactions: Transaction[];
  onUpdateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

export const BankMatching = ({ transactions, onUpdateTransaction }: BankMatchingProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      // Mock matching results
      const mockResults = [
        {
          id: '1',
          bankAmount: 1500,
          userAmount: 1500,
          description: 'Salary Payment',
          date: '2024-01-15',
          status: 'matched'
        },
        {
          id: '2',
          bankAmount: 250,
          userAmount: null,
          description: 'ATM Withdrawal',
          date: '2024-01-14',
          status: 'unmatched'
        }
      ];
      
      setMatchResults(mockResults);
      setIsProcessing(false);
      
      toast({
        title: "Bank Statement Processed",
        description: `Found ${mockResults.length} transactions. ${mockResults.filter(r => r.status === 'matched').length} matched, ${mockResults.filter(r => r.status === 'unmatched').length} unmatched.`,
      });
    }, 2000);
  };

  const handleMatch = (resultId: string, transactionId: string) => {
    onUpdateTransaction(transactionId, { is_reconciled: true });
    setMatchResults(prev => 
      prev.map(result => 
        result.id === resultId ? { ...result, status: 'matched' } : result
      )
    );
    
    toast({
      title: "Transaction Matched",
      description: "Transaction has been successfully matched with bank record.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bank Statement Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Upload Bank Statement</p>
                <p className="text-sm text-gray-500">Supports CSV, PDF, and Excel files</p>
                <Input
                  type="file"
                  accept=".csv,.pdf,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="max-w-sm mx-auto"
                />
              </div>
            </div>

            {uploadedFile && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium">Selected File: {uploadedFile.name}</p>
                <p className="text-sm text-gray-600">Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}

            {isProcessing && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Processing bank statement...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {matchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Matching Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matchResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {result.status === 'matched' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                        )}
                        <Badge variant={result.status === 'matched' ? 'default' : 'destructive'}>
                          {result.status}
                        </Badge>
                      </div>
                      <p className="font-medium">{result.description}</p>
                      <p className="text-sm text-gray-500">{result.date}</p>
                      <p className="text-sm">
                        Bank: ₹{result.bankAmount.toLocaleString()}
                        {result.userAmount && ` | Your Record: ₹${result.userAmount.toLocaleString()}`}
                      </p>
                    </div>
                    
                    {result.status === 'unmatched' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleMatch(result.id, transactions[0]?.id || '')}
                        >
                          Match with Transaction
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
