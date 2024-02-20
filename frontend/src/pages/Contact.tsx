import { MainNav } from "@/components/app-ui/main-nav";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Contact() {
    return (<>
        <div className="h-full w-full flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6" />
                </div>
            </div>
            <div className="h-full w-full flex-1 p-4 pt-2">
                <div className="flex flex-col my-4">
                    <h2 className="text-3xl font-bold tracking-tight">SkyCast</h2>
                    <small className="text-gray-800 mt-2">Elevating Your Weather Experience: Instant insights for your day, rain or shine.</small>
                </div>
                <div className="h-full w-full flex items-center justify-center">
                    <Card className="w-full md:w-1/2">
                        <CardHeader>
                            <CardTitle>SkyCast MailBox</CardTitle>
                            <CardDescription>Experience the Instant Weather Difference: Insights for your day, rain or shine.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email" className="text-start">Your Email</Label>
                                        <Input id="email" placeholder="Enter your Email" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className="text-start">Your Message</Label>
                                        <Textarea placeholder="Type your message here." />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex gap-2 justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button className="w-full">Send</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </div>
    </>);
}

export default Contact;