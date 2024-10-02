import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Youtube, Shirt } from 'lucide-react';

type Event = {
  type: string;
  title: string;
  investment: number;
  returns: number;
};

type ReturnsDashboardProps = {
  totalReturns: number;
  totalInvestment: number;
  todayReturns: number;
  rank: number;
  events: Event[];
};

const ReturnsDashboard: React.FC<ReturnsDashboardProps> = ({
  totalReturns,
  totalInvestment,
  todayReturns,
  rank,
  events
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">RETURNS</CardTitle>
        <p className="text-4xl font-bold">₹{totalReturns.toFixed(1)}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6 p-5">
          <div>
            <p className="text-sm text-gray-500">Investment</p>
            <p className="text-lg font-semibold">₹{totalInvestment.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Todays returns</p>
            <p className="text-lg font-semibold">₹{todayReturns}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Rank</p>
            <p className="text-lg font-semibold">{rank}</p>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Investment</TableHead>
              <TableHead>Returns</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center p-5">
                  {event.type === 'youtube' ? (
                    <Youtube className="mr-2 h-4 w-4 text-red-500" />
                  ) : (
                    <Shirt className="mr-2 h-4 w-4 text-blue-500" />
                  )}
                  {event.title}
                </TableCell>
                <TableCell>₹{event.investment.toFixed(1)}</TableCell>
                <TableCell className={event.returns >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {event.returns >= 0 ? '₹' : '- ₹'}{Math.abs(event.returns).toFixed(1)}
                </TableCell>
                <TableCell>
                  <button className="text-blue-500 hover:underline">View</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReturnsDashboard;