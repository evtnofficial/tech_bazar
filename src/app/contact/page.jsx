"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically send the form data to your backend
		console.log("Form submitted:", formData);
		// Reset form after submission
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8 text-center'>Contact Us</h1>

			<div className='grid md:grid-cols-2 gap-12 items-start'>
				<div>
					<h2 className='text-2xl font-semibold mb-6'>
						Get in Touch
					</h2>
					<p className='mb-8 text-lg'>
						Have a question or need assistance? We're here to help!
						Fill out the form, and our team will get back to you as
						soon as possible.
					</p>

					<div className='space-y-6'>
						<div className='flex items-center'>
							<Mail className='h-6 w-6 text-primary mr-4' />
							<div>
								<h3 className='font-semibold'>Email</h3>
								<p>support@techbazar.com</p>
							</div>
						</div>
						<div className='flex items-center'>
							<Phone className='h-6 w-6 text-primary mr-4' />
							<div>
								<h3 className='font-semibold'>Phone</h3>
								<p>+91 9026315148</p>
							</div>
						</div>
						<div className='flex items-center'>
							<MapPin className='h-6 w-6 text-primary mr-4' />
							<div>
								<h3 className='font-semibold'>Address</h3>
								<p>123 Bamba road Kalyanpur Kanpur 208017</p>
							</div>
						</div>
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Send Us a Message</CardTitle>
						<CardDescription>
							We'll get back to you as soon as possible.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									name='name'
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									name='email'
									type='email'
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<Label htmlFor='subject'>Subject</Label>
								<Input
									id='subject'
									name='subject'
									value={formData.subject}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<Label htmlFor='message'>Message</Label>
								<Textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleInputChange}
									required
									rows={5}
								/>
							</div>
							<Button type='submit' className='w-full'>
								Send Message
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
