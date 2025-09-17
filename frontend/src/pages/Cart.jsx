import { useEffect, useState } from 'react'
import { apiGet, apiDelete } from '../lib/api'
import { Link } from 'react-router-dom'

export function Cart() {
  const [cart, setCart] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Map backend product ids to known frontend image URLs as a fallback
  const idToImageUrl = {
    p1: '/images/gamepad_2.png',
    p2: '/images/keyboard.png',
    p3: '/images/monitor.png',
    p4: '/images/chair.png',
  }

  useEffect(() => {
    (async () => {
      try {
        const [{ cart }, { products }] = await Promise.all([
          apiGet('/cart'),
          apiGet('/products'),
        ])
        setCart(cart)
        setProducts(products)
      } catch (e) {
        setError(e?.error || 'Failed to load cart. Please login.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const productMap = new Map(products.map(p => [p.id, p]))

  const items = cart?.items?.map(i => ({
    ...i,
    product: productMap.get(i.productId)
  })) || []

  const subtotal = items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0)
  const total = subtotal 

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-10">Loading cart…</div>
  if (error) return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-red-600">{error}</p>
      <Link to="/signup" className="mt-4 inline-block underline">Create an account</Link>
    </section>
  )

  if (!items.length) return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <p className="mt-4 text-gray-600">Your cart is empty.</p>
      <Link to="/" className="mt-6 inline-block rounded-md bg-black px-5 py-3 text-white">Continue shopping</Link>
    </section>
  )

  async function clearCart() {
    try {
      const { cart: cleared } = await apiDelete('/cart')
      setCart(cleared)
      window.dispatchEvent(new CustomEvent('cart-updated'))
    } catch (e) {
      alert(e?.error || 'Failed to clear cart')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/" className="text-gray-600 hover:underline">Home</Link></li>
          <li><span className="text-gray-600">Cart</span></li>

        </ul>
      </div>

      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((i) => (
                <tr key={i.productId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 object-contain"
                          src={i.product?.imageUrl || idToImageUrl[i.productId] || 'https://via.placeholder.com/40?text=No+Image'}
                          alt={i.product?.name || 'Product image'}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{i.product?.name || 'Product'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${i.product?.price || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="number" min="1" defaultValue={i.quantity} className="w-16 text-center border rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${(i.product?.price || 0) * i.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700">Return To Shop</button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700">Update Cart</button>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-stretch space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1 max-w-sm">
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Coupon Code" className="flex-1 px-4 py-2 border border-gray-300 rounded-md" />
              <button className="px-4 py-2 bg-red-500 text-white rounded-md">Apply Coupon</button>
            </div>
          </div>
          
          <div className="flex-1 max-w-sm rounded-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Cart Total</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Subtotal:</span>
                <span className="text-sm font-semibold">${subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Shipping:</span>
                <span className="text-sm">Free</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold">${total}</span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <button className="w-full bg-red-500 text-white py-3 rounded-md">Proceed to checkout</button>
              <button onClick={clearCart} className="w-full border py-3 rounded-md">Clear cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart