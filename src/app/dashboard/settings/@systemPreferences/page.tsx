export default function SystemPreferencesPage() {
  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Preferences</h1>
        <button 
          disabled
          className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
        >
          Coming Soon
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Setting
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { id: 1, name: 'Email Notifications', value: 'Enabled', updatedAt: '2024-01-15' },
              { id: 2, name: 'Dark Mode', value: 'System Default', updatedAt: '2024-01-14' },
              { id: 3, name: 'Language', value: 'English', updatedAt: '2024-01-13' },
              { id: 4, name: 'Time Zone', value: 'UTC', updatedAt: '2024-01-12' },
            ].map((setting) => (
              <tr key={setting.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {setting.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {setting.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {setting.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-sm text-center">
          System preferences management coming soon. Stay tuned for updates!
        </p>
      </div>
    </div>
  )
}
