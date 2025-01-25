// 2 3 5 7 13 15 21 23 27 35 37 45 51 53 57 65

#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
#define fr(i, s, n) for (ll i = s; i < n; i++)
#define ia(a, n) \
    ll a[n];     \
    f(i, n) cin >> a[i]
using namespace std;
using namespace __gnu_pbds;
#define ll long long
#define MOD 1000000007
template <typename T>
using os = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;
template <typename T>
using oms = tree<T, null_type, less_equal<T>, rb_tree_tag, tree_order_statistics_node_update>;
ll power(ll a, ll b, ll mod = 0)
{
    ll result = 1;
    if (mod == 0)
    {
        while (b)
        {
            if (b & 1)
                result *= a;
            a *= a;
            b = b >> 1;
        }
    }
    else
    {
        while (b)
        {
            if (b & 1)
            {
                result *= a;
                result = result % mod;
            }
            a *= a;
            a = a % mod;
            b = b >> 1;
        }
    }
    return result;
}
int gcd(int a, int b)
{
    return b == 0 ? a : gcd(b, a % b);
}
// pehle check krle ke t input lena bhi hai ya nhi

bool isprime(ll n)
{
    if (n == 1)
        return false;
    if (n == 2)
        return true;
    if (n % 2 == 0)
        return false;
    for (ll i = 3; i * i <= n; i += 2)
    {
        if (n % i == 0)
            return false;
    }
    return true;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    // freopen("input.txt", "r", stdin);
    // freopen("output.txt", "w", stdout);
    vector<ll> v;
    v = {2, 3, 5, 7, 13, 15, 21, 23, 27, 35, 37, 45, 51, 53, 57, 65};
    vector<ll> primes;
    for (int i = 0; i < 100; i++)
    {
        if (isprime(i))
        {
            primes.push_back(i);
        }
    }

    for (auto it : primes)
    {
        cout << it << " ";
    }

    cout << endl;

    for (int i = 0; i < v.size(); i++)
    {
        cout << v[i] - primes[i] << " ";
    }
    return 0;
}