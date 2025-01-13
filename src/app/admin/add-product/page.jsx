import ProfileLayout from "@/components/profile-layout";
import AddProductForm from "@/components/add-product-form";

export default function AddProductPage() {
	return (
		<ProfileLayout isAdmin={true}>
			<h1 className='text-2xl font-bold mb-4'>Add New Product</h1>
			<AddProductForm />
		</ProfileLayout>
	);
}
