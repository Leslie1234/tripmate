import type { BudgetItem } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function BudgetBreakdown({ items }: { items: BudgetItem[] }) {
  const total = items.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">💰 预算预估</h3>
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-border">
              <th className="text-left px-4 py-3 font-medium text-gray-600">类别</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">预估金额</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">备注</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.category} className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">{item.category}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(item.amount)}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{item.notes}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-primary-50">
              <td className="px-4 py-3 font-semibold text-gray-900">总计</td>
              <td className="px-4 py-3 text-right font-bold text-primary-600 text-base">{formatCurrency(total)}</td>
              <td className="px-4 py-3 hidden sm:table-cell" />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
