function requireAdminKey(req, res, next) {
  // Grant access if user is authenticated with admin role (Google OAuth parthpanchal1933@gmail.com)
  if (req.user && (req.user.role === 'admin' || req.user.email === 'parthpanchal1933@gmail.com')) {
    return next();
  }

  const configuredAdminKey = process.env.ADMIN_API_KEY;
  const providedKey = req.get('x-admin-key');

  if (configuredAdminKey && providedKey && providedKey === configuredAdminKey) {
    return next();
  }

  return res.status(403).json({
    error: 'Admin access denied. Authenticate as admin or provide valid x-admin-key.',
    code: 'ADMIN_FORBIDDEN',
  });
}

export default requireAdminKey;
