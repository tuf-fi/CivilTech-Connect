<?php

namespace App\Http\Middleware;

use App\Models\StudentAccounts;
use Closure;
use Illuminate\Http\Request;

class EnsureStudentToken
{
    /**
     * Handle an incoming request.
     *
     * Sanctum's `auth:sanctum` middleware resolves the token's owning model
     * regardless of guard, so an admin (User) token would otherwise also pass
     * on routes intended for students, and vice versa. This middleware must
     * run after `auth:sanctum` and enforces that the authenticated model is
     * actually a StudentAccounts instance before allowing the request through.
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() instanceof StudentAccounts) {
            abort(403, 'This action is restricted to authenticated students.');
        }

        return $next($request);
    }
}
