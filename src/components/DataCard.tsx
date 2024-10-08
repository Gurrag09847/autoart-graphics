"use client";

import { LucideIcon } from "lucide-react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type CardProps = {
  title: string;
  value: string;
  description: string;
  Icon: LucideIcon;
};

const DataCard = ({ description, Icon, title, value }: CardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export default DataCard;
