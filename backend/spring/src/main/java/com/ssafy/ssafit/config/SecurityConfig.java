package com.ssafy.ssafit.config;

import com.ssafy.ssafit.JWT.JwtAccessDeniedHandler;
import com.ssafy.ssafit.JWT.JwtAuthenticationEntryPoint;
import com.ssafy.ssafit.JWT.JwtFilter;
import com.ssafy.ssafit.JWT.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(TokenProvider tokenProvider, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler) {

        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                    .httpBasic().disable() // httpBasic : ID, PW??? ????????? ?????????????????? ?????? (????????? ??????) vs. Bearer (?????? ??????)
                    .cors().configurationSource(corsConfigurationSource())
                .and()
                    .csrf().disable()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Session??? ???????????? ??????. STATELESS ????????? ??????.
                .and()
                    .exceptionHandling()
                    .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                    .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                    .formLogin().disable()
                    .authorizeRequests()
                    .antMatchers("/api/users/profile").access("hasRole('USER')")
                    .antMatchers(HttpMethod.GET, "/api/recommendation").permitAll()
                    .antMatchers(HttpMethod.POST, "/api/recommendation/profile").permitAll()
                    .antMatchers("/api/recommendation/**").access("hasRole('USER')")
                    .antMatchers("/api/users/bookmark").access("hasRole('USER')")
                    .antMatchers("/api/users/exercise-history").access("hasRole('USER')")
                    .anyRequest().permitAll()    // ??? ??? ????????? ?????? ??? ??????
                .and()
                    .addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class); // JwtFilter??? UsernamePasswordAuthenticationFilter ?????? ?????????

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // authenticationManager??? Bean ?????????.
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {

        return super.authenticationManagerBean();

    }

    // CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://j6a104.p.ssafy.io","https://j6a104.p.ssafy.io", "http://j6a104.p.ssafy.io:3000", "https://j6a104.p.ssafy.io:443"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);

        return source;

    }

}
