"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import DatePicker from "../components/ui/DatePicker";
import { Input } from "../components/ui/input";
import { Copy, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function Home() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("❤️");
  const [luyuanStartDate, setLuyuanStartDate] = useState("2025-05-01");
  const [mcStartDate, setMcStartDate] = useState("2025-05-08");
  const [customStartDate, setCustomStartDate] = useState("2025-05-16");
  const [dongjieStartDate, setDongjieStartDate] = useState("2025-05-29");
  const [copied, setCopied] = useState(false);

  const emojis = ["❤️", "😢", "😭", "🥺", "😔", "💔", "🫶", "😊"];

  // 改进的本地时区日期计算函数
  const calculateDayDifference = (
    startDateString: string,
    currentDate: Date
  ) => {
    // 使用本地时区创建起始日期（避免UTC转换）
    const [year, month, day] = startDateString.split("-").map(Number);
    const startDate = new Date(year, month - 1, day); // month需要减1因为Date构造函数的月份是0-based

    // 计算时间差
    const timeDiff = currentDate.getTime() - startDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return dayDiff;
  };

  // 添加一个工具函数来获取当前本地时区信息（可选，用于调试）
  const getCurrentTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  const handleGenerateLuyuanMessage = () => {
    const dayDiff = calculateDayDifference(luyuanStartDate, date);
    setMessage(`卢院不在的第${dayDiff}天，想他 ${selectedEmoji}`);
  };

  const handleGenerateMCMessage = () => {
    const dayDiff = calculateDayDifference(mcStartDate, date);
    setMessage(`MC不在的第${dayDiff}天，想他 ${selectedEmoji}`);
  };

  const handleGenerateCustomMessage = () => {
    if (!name) {
      alert("请输入自定义名字");
      return;
    }
    const dayDiff = calculateDayDifference(customStartDate, date);
    setMessage(`${name} 不在的第${dayDiff}天，想他 ${selectedEmoji}`);
  };

  const handleGenerateDongjieMessage = () => {
    const dayDiff = calculateDayDifference(dongjieStartDate, date);
    setMessage(`东杰离开 Reem 约饭群的第${dayDiff}天，想他 ${selectedEmoji}`);
  };

  const formatDateForInput = (dateString: string) => {
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
    return dateString.split("T")[0];
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            思念文案生成器
          </h1>

          <p className="text-xs text-gray-500 text-center mb-4">
            当前时区: {getCurrentTimezone()}
          </p>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">基本设置</TabsTrigger>
              <TabsTrigger value="advanced">高级设置</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">输入自定义名字</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">选择日期</label>
                <DatePicker
                  selectedDate={date}
                  onChange={(date) => setDate(date)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">选择表情</label>
                <Select value={selectedEmoji} onValueChange={setSelectedEmoji}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择表情" />
                  </SelectTrigger>
                  <SelectContent>
                    {emojis.map((emoji) => (
                      <SelectItem key={emoji} value={emoji}>
                        {emoji}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 mt-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">卢院起始日期</label>
                <Input
                  type="date"
                  value={formatDateForInput(luyuanStartDate)}
                  onChange={(e) => setLuyuanStartDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">MC起始日期</label>
                <Input
                  type="date"
                  value={formatDateForInput(mcStartDate)}
                  onChange={(e) => setMcStartDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">东杰起始日期</label>
                <Input
                  type="date"
                  value={formatDateForInput(dongjieStartDate)}
                  onChange={(e) => setDongjieStartDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">自定义人起始日期</label>
                <Input
                  type="date"
                  value={formatDateForInput(customStartDate)}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-2 gap-2 mt-6">
            <Button
              onClick={handleGenerateLuyuanMessage}
              className="flex-1 text-xs"
            >
              思念卢院一键生成
            </Button>
            <Button
              onClick={handleGenerateMCMessage}
              className="flex-1 text-xs"
            >
              思念MC一键生成
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <Button
              onClick={handleGenerateDongjieMessage}
              className="flex-1 text-xs"
            >
              思念东杰一键生成
            </Button>
            <Button onClick={handleGenerateCustomMessage} className="flex-1">
              思念“自定义名字”一键生成
            </Button>
          </div>

          {message && (
            <div className="mt-4">
              <div className="flex items-center justify-between p-4 bg-slate-100 rounded-md">
                <p className="text-lg">{message}</p>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="ml-2 h-8 w-8"
                  title="复制文案"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-1 text-right">
                  已复制到剪贴板
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
