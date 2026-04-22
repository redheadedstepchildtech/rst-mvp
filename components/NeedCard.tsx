import Link from 'next/link';

<Link href={`/need/${need.id}`}>
  <div className="...existing card styles...">
    ...existing content...
  </div>
</Link>

<Link
  href={`/need/${need.id}`}
  className="text-sm text-blue-600 hover:underline"
>
  View Details →
</Link>