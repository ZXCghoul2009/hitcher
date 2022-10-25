package com.app.hitcher.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "verificationToken")
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token")
    private String tokenValue;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "expiryDate")
    private Instant expiryDate;

    public VerificationToken(String tokenValue, User user, Instant expiryDate) {
        this.tokenValue = tokenValue;
        this.user = user;
        this.expiryDate = expiryDate;
    }

    public VerificationToken() {

    }
}