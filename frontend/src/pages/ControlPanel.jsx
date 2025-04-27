import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wind,
  Gauge,
  Power,
  MonitorUp,
  ThermometerSun,
  Upload,
  AlertTriangle,
  Moon,
  MessageSquare,
  Sun,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ControlPanel = () => {

  const { toast } = useToast();

  // System Controls State
  
  const [fan, setfan] = useState(false);
  const [aeration, setaeration] = useState(false);
  const [heat_sink, setheat_sink] = useState(false);
  const [light, setlight] = useState(false);
  const [light2, setlight2] = useState(false);
  const [systemPower, setSystemPower] = useState(true);

  // External LED Screen State
  const [screenMode, setScreenMode] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

    // Function to send control states to backend
    const sendControlUpdates = async (controlStates) => {
      try {
        const response = await fetch("http://localhost:5000/control/unit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(controlStates),
        });
  
        const data = await response.json();
  
        if (!data.success) {
          throw new Error("Failed to update controls");
        }
      } catch (error) {
        toast({
          title: "Update Failed",
          description: "Failed to update control settings.",
          variant: "destructive",
        });
        console.error("Error updating controls:", error);
      }
    };
  
    // Modified state updater functions that also send updates to backend
    const updateFan = (value) => {
      setfan(value);
      sendControlUpdates({
        fan: value,
        aeration,
        heat_sink,
        light,
        light2,
      });
    };
  
    const updateAeration = (value) => {
      setaeration(value);
      sendControlUpdates({
        fan,
        aeration: value,
        heat_sink,
        light,
        light2,
      });
    };
  
    const updateHeatSink = (value) => {
      setheat_sink(value);
      sendControlUpdates({
        fan,
        aeration,
        heat_sink: value,
        light,
        light2,
      });
    };
  
    const updateLight = (value) => {
      setlight(value);
      sendControlUpdates({
        fan,
        aeration,
        heat_sink,
        light: value,
        light2,
      });
    };
  
    const updateLight2 = (value) => {
      setlight2(value);
      sendControlUpdates({
        fan,
        aeration,
        heat_sink,
        light,
        light2: value,
      });
    };
  
  // Mock sensor data (replace with real data when available)
  // const sensorData = {
  //   ph: 7.2,
  //   turbidity: 85,
  //   temperature: 24.5,
  //   co2Level: 420,
  //   o2Level: 8.5,
  // };

  const handleEmergencyShutdown = () => {
    setSystemPower(false);
    toast({
      variant: "destructive",
      title: "Emergency Shutdown Initiated",
      description: "System is shutting down. Please wait for complete shutdown.",
    });
  };


    // ✅ Handle file selection
  const handleFileChange = (event) => {
    if (!event.target.files?.length) return;
    setSelectedFile(event.target.files[0]); // Save selected file

    toast({
      title: "File Selected",
      description: `File "${event.target.files[0].name}" selected.`,
    });
  };


  const handleMediaUpload = async () => {
    if (!selectedFile) {
      toast({ title: "Error", description: "No file selected!" });
      return;
    }
  
    // ✅ Prepare FormData to send the file
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      // ✅ Send file to backend
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Media Upload Successful",
          description: `File "${file.name}" uploaded successfully.`,
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading the file.",
      });
    }
  };
  
  const sendCustomMessage = async () => {
    if (!customMessage.trim()) return;
  
    try {
      // ✅ Send message to backend
      const response = await fetch("http://localhost:5000/custom-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: customMessage }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast({
          title: "Message Updated",
          description: "Custom message has been set successfully.",
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message.",
      });
    }
    setCustomMessage("");
  };



  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AIGLE System Control Panel</h1>
        <div className="flex items-center gap-4">
          <Button
            variant={systemPower ? "default" : "outline"}
            onClick={() => setSystemPower(!systemPower)}
            className={`gap-2 ${systemPower ? "bg-green-500 hover:bg-green-600" : "bg-white"}`}
          >
            <Power className="h-4 w-4" />
            {systemPower ? "System ON" : "System OFF"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleEmergencyShutdown}
            className="gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            Emergency Shutdown
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Aeration Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5" />
              Fan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Power</span>
              <Switch
                checked={fan}
                onCheckedChange={updateFan}
              />
            </div>
          </CardContent>
        </Card>

        {/* Heat Sink Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="h-5 w-5" />
              Heat Sink Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Power</span>
              <Switch
                checked={heat_sink}
                onCheckedChange={updateHeatSink}
              />
            </div>
          </CardContent>
        </Card>

        {/* LED Light Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              LED Light Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
              <span>Power</span>
              <Switch
                checked={light}
                onCheckedChange={updateLight}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="h-5 w-5" />
              LED Light Control 2
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Power</span>
              <Switch
                checked={light2}
                onCheckedChange={updateLight2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="h-5 w-5" />
              Aeration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Power</span>
              <Switch
                checked={aeration}
                onCheckedChange={updateAeration}
              />
            </div>
          </CardContent>
        </Card>

        {/* External LED Screen Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MonitorUp className="h-5 w-5" />
              Screen Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={screenMode} onValueChange={setScreenMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">System Status</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="custom">Custom Message</SelectItem>
              </SelectContent>
            </Select>
            
            {screenMode === "advertisement" && (
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
                <Button variant="secondary" className="w-full gap-2" onClick={handleMediaUpload}>
                  <Upload className="h-4 w-4" />
                  Upload Media
                </Button>
              </div>
            )}
            
            {screenMode === "custom" && (
              <div className="space-y-2">
                <Input
                  placeholder="Enter custom message"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
                <Button
                  variant="secondary"
                  className="w-full gap-2"
                  onClick={sendCustomMessage}
                >
                  <MessageSquare className="h-4 w-4" />
                  Set Message
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ControlPanel;