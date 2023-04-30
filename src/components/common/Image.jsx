import { useState } from 'react'
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react'
import cloudinary from 'cloudinary-core'

const cloudinaryCore = new cloudinary.Cloudinary({
	cloud_name: 'dg8j5cck1',
	api_key: '257774814993417',
	api_secret: 'J93nr_PWFg2-9PqxkTQ761fErdc',
	upload_preset: 'ml_default',
})

const ImagePage = () => {
	const [imageUrl, setImageUrl] = useState(null)

	const handleImageUpload = async (event) => {
		const file = event.target.files[0]
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'auk8f5a2')
		formData.append('folder', 'HKCR/Cars')

		const response = await fetch(
			`https://api.cloudinary.com/v1_1/dg8j5cck1/image/upload`,
			{
				method: 'POST',
				body: formData,
			}
		)
		const data = await response.json()
		console.log('🚀 ~ file: Image.jsx:39 ~ handleImageUpload ~ data:', data)
		setImageUrl(data.secure_url)
		console.log(
			'🚀 ~ file: Image.jsx:45 ~ handleImageUpload ~ imageUrl:',
			imageUrl
		)
	}

	return (
		<div>
			<input type="file" onChange={handleImageUpload} />

			{imageUrl && (
				<CloudinaryContext cloudName="dg8j5cck1">
					<Image publicId={imageUrl} alt="Product Image"></Image>
				</CloudinaryContext>
			)}
		</div>
	)
}

export default ImagePage
