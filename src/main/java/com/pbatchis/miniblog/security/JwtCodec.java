package com.pbatchis.miniblog.security;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtCodec {

	private static final Logger logger = LoggerFactory.getLogger(JwtCodec.class);

    @Value("${com.pbatchis.miniblog.jwtExpirationMs}")
	private int jwtExpirationMs;

	@Value("${com.pbatchis.miniblog.jwtSignatureAlgorithm}")
	private String jwtSignatureAlgorithm;

    @Value("${com.pbatchis.miniblog.jwtSecretKey}")
	private String jwtSecretKey;

    public String generateJwtToken(String username) {
		Date now = new Date();
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.forName(jwtSignatureAlgorithm), jwtSecretKey)
				.compact();
	}

	public String getUsernameFromJwtToken(String jwtToken) {
		try {
			return Jwts.parser().setSigningKey(jwtSecretKey)
					.parseClaimsJws(jwtToken).getBody().getSubject();

		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}
		return null;
	}
}
