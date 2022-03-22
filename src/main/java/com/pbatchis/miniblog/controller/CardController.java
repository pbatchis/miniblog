package com.pbatchis.miniblog.controller;

import java.util.List;
import java.util.Optional;
import com.pbatchis.miniblog.domain.Card;
import com.pbatchis.miniblog.domain.User;
import com.pbatchis.miniblog.payload.request.CardAddRequestBody;
import com.pbatchis.miniblog.payload.request.CardDeleteRequestBody;
import com.pbatchis.miniblog.payload.request.CardEditRequestBody;
import com.pbatchis.miniblog.payload.response.CardGetResponseBody;
import com.pbatchis.miniblog.payload.response.MessageResponseBody;
import com.pbatchis.miniblog.repository.CardRepository;
import com.pbatchis.miniblog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/card")
public class CardController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	CardRepository cardRepository;

	@GetMapping("/get")
	public CardGetResponseBody get() {
		List<Card> cards = cardRepository.findAll();
		return CardGetResponseBody.of(cards);
	}

    @PostMapping("/add")
	public ResponseEntity<?> add(Authentication authentication, 
			@RequestBody CardAddRequestBody requestBody) {
		
		// Validate authorization to add card.
		if (authentication == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
					MessageResponseBody.of("Only authenticated user can add card."));
		}
		Optional<User> user = userRepository.findByUsername(authentication.getName());
		if (user.isEmpty()) {
			return ResponseEntity.internalServerError().body(
					MessageResponseBody.of("Cannot process user."));
		}

		// OK to add card.
		Card card = new Card(
				requestBody.getName(),
				requestBody.getStatus(),
				requestBody.getContent(),
				requestBody.getCategory(),
				user.get());
		cardRepository.save(card);
		return ResponseEntity.ok(MessageResponseBody.of("Card[%d] added.", card.getId()));
	}
    
    @PostMapping("/edit")
	public ResponseEntity<?> edit(Authentication authentication, 
			@RequestBody CardEditRequestBody requestBody) {

		// Validate authorization to edit card.
		if (authentication == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
					MessageResponseBody.of("Only authenticated user can edit card."));
		}
		Optional<User> user = userRepository.findByUsername(authentication.getName());
		if (user.isEmpty()) {
			return ResponseEntity.internalServerError().body(
					MessageResponseBody.of("Cannot process user."));
		}
		Long userId = user.get().getId();
		Card card = cardRepository.getById(requestBody.getId());
		if (userId != card.getAuthor().getId()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
					MessageResponseBody.of("User can only edit their own cards."));
		}

		// OK to edit card.
		card.setName(requestBody.getName());
		card.setStatus(requestBody.getStatus());
		card.setContent(requestBody.getContent());
		card.setCategory(requestBody.getCategory());
		cardRepository.save(card);
		return ResponseEntity.ok(MessageResponseBody.of("Card[%d] edited.", card.getId()));
	}
    
    @PostMapping("/delete")
	public ResponseEntity<?> delete(Authentication authentication, 
			@RequestBody CardDeleteRequestBody requestBody) {

		// Validate authorization to delete card.
		if (authentication == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
					MessageResponseBody.of("Only authenticated user can delete card."));
		}
		Optional<User> user = userRepository.findByUsername(authentication.getName());
		if (user.isEmpty()) {
			return ResponseEntity.internalServerError().body(
					MessageResponseBody.of("Cannot process user."));
		}
		Long userId = user.get().getId();
		Card card = cardRepository.getById(requestBody.getId());
		if (userId != card.getAuthor().getId()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
					MessageResponseBody.of("User can only delete their own cards."));
		}

		// OK to delete card.
		cardRepository.delete(card);
		return ResponseEntity.ok(MessageResponseBody.of("Card[%d] deleted.", card.getId()));
	}
}
