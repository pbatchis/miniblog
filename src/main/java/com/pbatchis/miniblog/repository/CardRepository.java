package com.pbatchis.miniblog.repository;

import java.util.List;
import java.util.Optional;
import com.pbatchis.miniblog.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Persistence operations for the Card entity.
 */
@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

	Optional<Card> findById(Long id);

    List<Card> findAll();
}
