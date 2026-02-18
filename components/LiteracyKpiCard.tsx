"use client";

import { Card, Text, Metric, Flex } from "@tremor/react";
import { Rows } from "lucide-react";

interface LiteracyKpiCardProps {
  literacyScore: number;
  title?: string;
  totalRows:number;
}

function getBandColor(score: number) {
  if (score < 60) return "text-red-500";
  if (score < 80) return "text-yellow-500";
  return "text-green-500";
}

export default function LiteracyKpiCard({
  literacyScore,
  totalRows,
  title = "Literacy Score",
  
}: LiteracyKpiCardProps) {
  return (
    <Card className="max-w-sm">
      <Flex justifyContent="between" alignItems="center">
        <Text>{title}</Text>
      </Flex>

      <Metric className={`${getBandColor(literacyScore)} mt-2`}>
        {literacyScore.toFixed(1)}%
      </Metric>

      <Text className="mt-2 text-sm text-gray-500">
        {totalRows} correct across scored items
      </Text>
    </Card>
  );
}

