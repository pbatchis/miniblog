package com.pbatchis.miniblog.repository;

import java.util.Optional;
import com.pbatchis.miniblog.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Persistence operations for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
}
