package com.pbatchis.miniblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pbatchis.miniblog.model.User;
import com.pbatchis.miniblog.payload.request.AuthSigninRequestBody;
import com.pbatchis.miniblog.payload.request.AuthRegisterRequestBody;
import com.pbatchis.miniblog.payload.response.AuthSigninResponseBody;
import com.pbatchis.miniblog.payload.response.MessageResponseBody;
import com.pbatchis.miniblog.repository.UserRepository;
import com.pbatchis.miniblog.security.JwtCodec;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

    @Autowired
	UserRepository userRepository;

    @Autowired
	PasswordEncoder passwordEncoder;

    @Autowired
	JwtCodec jwtCodec;

    @PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody AuthSigninRequestBody requestBody) {
		String username = requestBody.getUsername();
		String password = requestBody.getPassword();

		// Authenticate user. Otherwise AuthenticationException will throw, and return 401.
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password));

		// Add authentication into security context.
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Generate JWT token for the response.
		String jwtToken = jwtCodec.generateJwtToken(requestBody.getUsername());
		
		return ResponseEntity.ok(AuthSigninResponseBody.of(jwtToken, username));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody AuthRegisterRequestBody requestBody) {

        // Validate
        if (requestBody.getUsername().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(MessageResponseBody.of("Username cannot be blank."));
        }
        if (requestBody.getPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(MessageResponseBody.of("Password cannot be blank."));
        }
		if (userRepository.existsByUsername(requestBody.getUsername())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(MessageResponseBody.of("Username already taken."));
		}

		// Create new user account
        String encodedPassword = passwordEncoder.encode(requestBody.getPassword());
		User user = new User(requestBody.getUsername(), encodedPassword);
		userRepository.save(user);
		return ResponseEntity.ok(MessageResponseBody.of("User registered successfully."));
	}
}
