import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const OrderBook = () => {
    const [yesPrice, setYesPrice] = useState(5);
    const [noPrice, setNoPrice] = useState(5);
  return (
    <div className="container mx-auto p-4">
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-2/3">
        <Tabs defaultValue="orderbook">
          <TabsList>
            <TabsTrigger value="orderbook">Orderbook</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="orderbook">
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="order_book">
                  <TabsList>
                    <TabsTrigger value="order_book">Order Book</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="order_book">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>PRICE</TableHead>
                          <TableHead>QTY AT YES</TableHead>
                          <TableHead>PRICE</TableHead>
                          <TableHead>QTY AT NO</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...Array(5)].map((_, index) => (
                          <TableRow key={index}>
                            <TableCell>0</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full md:w-1/3">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between mb-4">
              <Button variant="default" className="bg-blue-500 text-white">Yes ₹{yesPrice}</Button>
              <Button variant="outline">No ₹{noPrice}</Button>
            </div>
            <div className="flex justify-between mb-4">
              <Button variant="outline">Set price</Button>
              <Button variant="outline">Instant match</Button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <Input type="number" value="9.5" className="mt-1" />
              <p className="text-sm text-gray-500">0 qty available</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <Input type="number" value="1" className="mt-1" />
            </div>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-lg font-bold">₹{yesPrice}</p>
                <p className="text-sm text-gray-500">You put</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-500">₹{yesPrice+noPrice - yesPrice}</p>
                <p className="text-sm text-gray-500">You get</p>
              </div>
            </div>
            <Button className="w-full bg-blue-500 text-white">Place order</Button>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default OrderBook;