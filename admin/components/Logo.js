import Link from 'next/link'

export default function Logo () {
  return (
    <div className="flex flex-col text-text_primary p-2 rounded-lg">
    <Link href={'/'} className="flex gap-1">
      <span className="">
        Admin
      </span>
    </Link>
  </div>
  )
}
