import ProfileLayout from "@/components/profile-layout";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
	// In a real application, you would fetch the products from your backend
	const products = [
		{ id: "1", name: "Tech Blog", type: "Website", price: 5000 },
		{ id: "2", name: "E-commerce Store", type: "Website", price: 10000 },
		{ id: "3", name: "YouTube Channel", type: "YouTube", price: 7500 },
	];

	return (
		<ProfileLayout isAdmin={true}>
			<h1 className='text-2xl font-bold mb-4'>All Products</h1>
			<div className='bg-white shadow rounded-lg overflow-hidden'>
				<table className='min-w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								ID
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Type
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Price
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{products.map((product) => (
							<tr key={product.id}>
								<td className='px-6 py-4 whitespace-nowrap'>
									{product.id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{product.name}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{product.type}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									${product.price}
								</td>
								<td className='px-6 py-4 whitespace-nowrap space-x-2'>
									<Button size='sm'>Edit</Button>
									<Button size='sm' variant='destructive'>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</ProfileLayout>
	);
}
