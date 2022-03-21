package com.pbatchis.miniblog.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * This filter is used on every request to check for
 * JWT authorization, and if so authorized, puts the
 * user authentication data into the security context.
 */
public class JwtAuthorizationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtCodec jwtCodec;

	@Autowired
	private UserDetailsService userDetailsService;

	public JwtAuthorizationFilter() {
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// Authorization by JWT
		String authorizationHeader = request.getHeader("Authorization");
		if (authorizationHeader != null) {
			String jwtToken = substringAfterPrefix(authorizationHeader, "Bearer ");
			if (jwtToken != null) {
				String username = jwtCodec.getUsernameFromJwtToken(jwtToken);
				if (username != null) {
					UserDetails userDetails = userDetailsService.loadUserByUsername(username);
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}
		}

		filterChain.doFilter(request, response);
	}

	private static String substringAfterPrefix(String str, String prefix) {
		if (str.startsWith(prefix)) {
			return str.substring(prefix.length());
		}
		return null;
	}
}
