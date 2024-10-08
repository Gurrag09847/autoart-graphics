"use client";

import { LucideIcon } from "lucide-react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "./ui/skeleton";

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
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DataCard;

export const LoadingDataCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="w-full text-sm font-medium">
          <Skeleton className="h-7 w-full" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
   
          <Skeleton className="w-full h-5" />
        
        
          <Skeleton className="w-full h-3" />
        
      </CardContent>
    </Card>
  );
};
