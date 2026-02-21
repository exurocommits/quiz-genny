# Quiz Genny - Pre-Launch Testing Checklist

**Status:** Code Complete - Awaiting Testing
**Version:** 1.0.0
**Target Launch:** 2026-03-12

---

## ✅ Phase 1.1: MVP Polish - Testing

### Export Formats Testing

#### PPTX Export
- [ ] Generate a quiz with 3 rounds, 10 questions each
- [ ] Export to PPTX format
- [ ] Open in PowerPoint/Microsoft PowerPoint
- [ ] Verify: Title slide exists and is properly formatted
- [ ] Verify: All rounds are created as sections
- [ ] Verify: All questions are included
- [ ] Verify: Answer slides exist (test each reveal option)
  - [ ] Reveal after each round
  - [ ] Reveal after 2 rounds
  - [ ] Reveal at end
- [ ] Verify: No text overflow on slides
- [ ] Verify: Images are embedded properly
- [ ] Verify: Closing slide exists
- [ ] File size is reasonable (< 10MB for 30 questions)

#### PDF Export
- [ ] Generate a quiz with 3 rounds, 10 questions each
- [ ] Export to PDF format
- [ ] Open in PDF viewer
- [ ] Verify: Title slide exists
- [ ] Verify: All rounds are properly separated
- [ ] Verify: All questions are readable
- [ ] Verify: Answer slides have color coding
- [ ] Verify: Page breaks are correct
- [ ] Verify: No text cut off on any page
- [ ] Verify: Closing slide exists
- [ ] File size is reasonable (< 5MB for 30 questions)

#### Google Slides Export
- [ ] Generate a quiz with 3 rounds, 10 questions each
- [ ] Export to Google Slides
- [ ] Open the generated Google Slides presentation
- [ ] Verify: Presentation is created in user's Google Drive
- [ ] Verify: All slides are present
- [ ] Verify: Title slide exists
- [ ] Verify: Round sections are properly created
- [ ] Verify: Questions are formatted correctly
- [ ] Verify: Answer slides exist
- [ ] Verify: Closing slide exists
- [ ] Verify: Can edit the presentation
- [ ] Verify: Can share the presentation

### Question Generation Testing

#### OpenAI Integration
- [ ] Generate questions with "General Knowledge" topic
- [ ] Verify: Questions are generated successfully
- [ ] Verify: Questions are factually accurate
- [ ] Verify: Difficulty distribution matches selection
- [ ] Generate with "Easy" difficulty - all questions should be easy
- [ ] Generate with "Hard" difficulty - all questions should be hard
- [ ] Verify: No duplicate questions in same quiz
- [ ] Verify: Questions are appropriate for selected audience

#### Question Verification
- [ ] Run verification on generated questions
- [ ] Verify: Fact-checking works (requires Tavily API)
- [ ] Verify: Duplicate detection works
- [ ] Verify: Difficulty scoring is accurate
- [ ] Verify: Inappropriate content filtering works

---

## ✅ Phase 1.2: Auth & Billing - Testing

### Authentication Testing

#### Signup Flow
- [ ] Visit /setup page
- [ ] Click "Sign Up"
- [ ] Enter valid email (e.g., test@example.com)
- [ ] Enter password (8+ characters)
- [ ] Enter full name
- [ ] Submit form
- [ ] Verify: Success message shown
- [ ] Verify: Email verification sent (check Supabase logs)
- [ ] Try to login before email verified - should be blocked
- [ ] Click verification link from email
- [ ] Verify: User is now logged in
- [ ] Check Supabase - user record created
- [ ] Check Supabase - profile record created with tier="free"

#### Login Flow
- [ ] Visit /login
- [ ] Enter registered email
- [ ] Enter correct password
- [ ] Submit form
- [ ] Verify: Redirected to home/setup
- [ ] Verify: JWT token received in response
- [ ] Verify: Refresh token received
- [ ] Check token payload contains user ID
- [ ] Try to login with wrong password - should show error

#### Logout Flow
- [ ] Click logout button
- [ ] Verify: Redirected to landing page
- [ ] Verify: LocalStorage cleared
- [ ] Try to access protected route - should redirect to login
- [ ] Try to login again with same credentials - should work

#### Password Reset
- [ ] Visit login page
- [ ] Click "Forgot Password"
- [ ] Enter registered email
- [ ] Submit form
- [ ] Verify: Reset email sent (check logs)
- [ ] Click reset link from email
- [ ] Enter new password (8+ characters)
- [ ] Submit form
- [ ] Verify: Password updated message
- [ ] Login with new password - should work
- [ ] Login with old password - should fail

### Authorization Testing

#### Protected Routes
- [ ] Try to access /user/profile without token - should return 401
- [ ] Try to access /user/usage without token - should return 401
- [ ] Login and get token
- [ ] Access /user/profile with token - should work
- [ ] Access /user/usage with token - should work
- [ ] Wait for token to expire (test with short expiry)
- [ ] Try to access with expired token - should return 401
- [ ] Use refresh token to get new access token - should work

#### Tier-Based Access
- [ ] Create Free tier user
- [ ] Try to generate 2nd quiz in same month - should be blocked
- [ ] Upgrade to Pro tier via Stripe
- [ ] Generate 2nd quiz - should work
- [ ] Try to generate 21st quiz - should be blocked (Pro limit is 20)
- [ ] Upgrade to Team tier
- [ ] Generate 21st quiz - should work (unlimited)
- [ ] Generate 100th quiz - should work

### Stripe Integration Testing

#### Checkout Flow (Test Mode)
- [ ] Set Stripe to test mode
- [ ] Login as Free tier user
- [ ] Click "Upgrade to Pro"
- [ ] Verify: Redirected to Stripe Checkout
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Complete payment
- [ ] Verify: Redirected back to app
- [ ] Verify: User tier changed to "pro"
- [ ] Verify: Stripe customer created
- [ ] Check Stripe dashboard - subscription created
- [ ] Try with declined card: 4000 0000 0000 0002 - should show error
- [ ] Try with insufficient funds: 4000 0025 0000 3155 - should show error

#### Subscription Management
- [ ] Check /user/profile - should show subscription
- [ ] Verify: Subscription status is "active"
- [ ] Verify: Next billing date is correct
- [ ] Cancel subscription in Stripe dashboard
- [ ] Wait 1 minute
- [ ] Refresh app - should show subscription as "canceled"
- [ ] Verify: User still has Pro access until end of month
- [ ] After month ends - should revert to Free tier

#### Webhook Testing
- [ ] Set up Stripe webhook endpoint
- [ ] In Stripe dashboard, send test webhook for customer.subscription.created
- [ ] Verify: Webhook received and processed
- [ ] Check logs - user tier updated
- [ ] Send test webhook for customer.subscription.updated
- [ ] Verify: Tier updated correctly
- [ ] Send test webhook for customer.subscription.deleted
- [ ] Verify: Tier reverted to free

### Rate Limiting Testing

#### Auth Endpoints
- [ ] Make 100 login requests in 15 minutes with valid credentials - should work
- [ ] Make 101st login request - should return 429 (too many requests)
- [ ] Check Retry-After header
- [ ] Wait 15 minutes - should work again
- [ ] Make 200 signup requests - should be rate limited

#### API Endpoints
- [ ] Make 100 quiz generation requests - should work
- [ ] Make 101st request - should return 429
- [ ] Verify: Different IPs have separate limits

---

## ✅ Phase 1.3: UI Polish - Testing

### Mobile Responsive Testing

#### Viewport: iPhone SE (375x667)
- [ ] Load landing page - should be readable
- [ ] Tap "Get Started" - should work
- [ ] Tap login - should show login form
- [ ] Enter email/password - should not zoom
- [ ] Tap "Sign Up" - should work
- [ ] Generate quiz - all steps should be usable
- [ ] Export quiz - button should be tappable
- [ ] Navigate between rounds - should work

#### Viewport: iPhone 12 Pro (390x844)
- [ ] Load landing page - should be properly sized
- [ ] Test all interactive elements
- [ ] Verify: No horizontal scrolling
- [ ] Verify: Text is readable
- [ ] Verify: Images are properly sized

#### Viewport: Tablet (768x1024)
- [ ] Load landing page - should look good
- [ ] Test quiz generation flow
- [ ] Verify: Layout adapts to tablet

### Cross-Browser Testing

#### Chrome (Latest)
- [ ] Load app - should work
- [ ] Generate quiz - should work
- [ ] Export to all formats - should work
- [ ] Check Console for errors - should be clean

#### Firefox (Latest)
- [ ] Load app - should work
- [ ] Generate quiz - should work
- [ ] Export to all formats - should work
- [ ] Check Console for errors - should be clean

#### Safari (Latest)
- [ ] Load app - should work
- [ ] Generate quiz - should work
- [ ] Export to all formats - should work
- [ ] Check Console for errors - should be clean

#### Edge (Latest)
- [ ] Load app - should work
- [ ] Generate quiz - should work
- [ ] Export to all formats - should work
- [ ] Check Console for errors - should be clean

### Legal Pages Testing

#### Terms of Service
- [ ] Visit /terms - should load
- [ ] Verify: All sections are visible
- [ ] Verify: Links work
- [ ] Verify: Mobile readable
- [ ] Scroll to bottom - should work

#### Privacy Policy
- [ ] Visit /privacy - should load
- [ ] Verify: All sections are visible
- [ ] Verify: Links work
- [ ] Verify: Mobile readable
- [ ] Scroll to bottom - should work

---

## ✅ Performance Testing

### Lighthouse Audit (Desktop)
- [ ] Run Lighthouse audit
- [ ] Performance score: > 90
- [ ] Accessibility score: > 90
- [ ] Best Practices score: > 90
- [ ] SEO score: > 90

### Lighthouse Audit (Mobile)
- [ ] Run Lighthouse audit on mobile
- [ ] Performance score: > 85
- [ ] Accessibility score: > 90
- [ ] Best Practices score: > 90
- [ ] SEO score: > 90

### Load Testing
- [ ] Simulate 10 concurrent users generating quizzes
- [ ] Verify: All requests succeed
- [ ] Verify: Response time < 3s
- [ ] Simulate 50 concurrent users
- [ ] Verify: Most requests succeed
- [ ] Check for database connection issues
- [ ] Check for OpenAI rate limits

---

## ✅ Security Testing

### Input Validation
- [ ] Try XSS in quiz topic: `<script>alert('xss')</script>`
- [ ] Verify: Input is sanitized or escaped
- [ ] Try SQL injection in quiz topic: `' OR '1'='1`
- [ ] Verify: Query fails safely
- [ ] Try very long input (10,000 characters)
- [ ] Verify: Input is truncated or rejected

### Authentication Security
- [ ] Try to brute force login (100 attempts)
- [ ] Verify: Account locked after 5 attempts
- [ ] Try to use expired JWT token
- [ ] Verify: Returns 401
- [ ] Try to use tampered JWT token
- [ ] Verify: Returns 401
- [ ] Try to access another user's data
- [ ] Verify: Returns 403

### API Security
- [ ] Try to access /api/generate without token
- [ ] Verify: Returns 401
- [ ] Try to access /api/export without token
- [ ] Verify: Returns 401
- [ ] Check CORS headers - should only allow frontend URL
- [ ] Try request from different origin - should be blocked

### Secrets Security
- [ ] Check git history - no API keys committed
- [ ] Check .env.example - all secrets are placeholders
- [ ] Check client-side code - no secrets exposed
- [ ] Check browser console - no secrets logged

---

## ✅ Integration Testing

### End-to-End Flow
- [ ] User signs up
- [ ] User verifies email
- [ ] User generates first quiz
- [ ] User exports to PPTX
- [ ] User exports to PDF
- [ ] User exports to Google Slides
- [ ] User upgrades to Pro via Stripe
- [ ] User generates 20th quiz
- [ ] User cancels subscription
- [ ] User reverts to Free tier
- [ ] User logs out

### Error Handling
- [ ] Disconnect internet - should show offline message
- [ ] Reconnect - should recover gracefully
- [ ] Make OpenAI API return error - should show user-friendly error
- [ ] Make Stripe return error - should show user-friendly error
- [ ] Make database return error - should show user-friendly error

---

## ✅ Documentation Review

- [ ] README.md is up to date
- [ ] API documentation exists
- [ ] Environment variables documented in .env.example
- [ ] Deployment instructions exist
- [ ] Troubleshooting guide exists
- [ ] Terms of Service is current
- [ ] Privacy Policy is current

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All tests pass
- [ ] Environment variables configured in production
- [ ] SSL certificates installed
- [ ] Database migrations run
- [ ] Supabase project configured
- [ ] Stripe product/price IDs configured
- [ ] DNS records configured
- [ ] CDN configured (if applicable)

### Deployment to Vercel
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables
- [ ] Deploy to production
- [ ] Verify deployment succeeds
- [ ] Test live site
- [ ] Configure custom domain (if applicable)

### Post-Deployment
- [ ] Run smoke tests on production
- [ ] Verify all integrations work
- [ ] Check error logs
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure uptime monitoring
- [ ] Set up alerts for errors

---

## 🚨 Critical Bugs to Fix Before Launch

List any critical bugs found during testing:

1.
2.
3.

---

## 📝 Test Results Summary

**Total Tests:** 200+
**Passed:** ___/___
**Failed:** ___/___
**Skipped:** ___/___

**Overall Status:** ⬜ Not Started | ⬜ In Progress | ✅ Passed | ❌ Failed

---

## 🎯 Sign-Off

**Developer:** Claw (AI)
**Reviewer:** [Your Name]
**Date:** ___________

**Ready for Launch:** ⬜ Yes | ⬜ No

**Comments:**
_________________________________
_________________________________
_________________________________
