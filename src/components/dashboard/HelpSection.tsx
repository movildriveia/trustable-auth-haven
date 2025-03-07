
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  MessageSquare, 
  FileQuestion, 
  Phone, 
  Mail,
  ExternalLink
} from "lucide-react";

const HelpSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted. We'll get back to you soon.");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-custom-dark mb-6">Help & Support</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Contact Us</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help you?" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Describe your issue or question" 
                rows={5}
              />
            </div>
            
            <Button type="submit" className="w-full">Submit Request</Button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Support Options</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="text-blue-500 mt-1" size={20} />
                <div>
                  <h4 className="font-medium">Live Chat</h4>
                  <p className="text-sm text-gray-500">Chat with our support team during business hours.</p>
                  <Button variant="link" className="p-0 h-auto text-sm flex items-center gap-1">
                    Start Chat <ExternalLink size={12} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FileQuestion className="text-green-500 mt-1" size={20} />
                <div>
                  <h4 className="font-medium">Knowledge Base</h4>
                  <p className="text-sm text-gray-500">Browse our documentation and FAQs.</p>
                  <Button variant="link" className="p-0 h-auto text-sm flex items-center gap-1">
                    View Articles <ExternalLink size={12} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="text-purple-500 mt-1" size={20} />
                <div>
                  <h4 className="font-medium">Phone Support</h4>
                  <p className="text-sm text-gray-500">Call us at:</p>
                  <p className="font-medium">+1 (888) 123-4567</p>
                  <p className="text-xs text-gray-500">Monday-Friday, 9AM-5PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="text-red-500 mt-1" size={20} />
                <div>
                  <h4 className="font-medium">Email Support</h4>
                  <p className="text-sm text-gray-500">Send an email to:</p>
                  <a href="mailto:support@nexusfinlabs.com" className="text-blue-500 hover:underline">
                    support@nexusfinlabs.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
