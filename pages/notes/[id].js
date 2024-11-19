import { useRouter } from 'next/router'
import Note from '../../components/Note'

export default function Home() {
    const router = useRouter()
    console.log(router.query)
    return (
        <Note selectedId={router.query.id} isEditing={false /*isEditing*/} />
    )
}