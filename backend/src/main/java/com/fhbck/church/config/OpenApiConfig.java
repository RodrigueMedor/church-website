package com.fhbck.church.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        var securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");

        return new OpenAPI()
                .info(new Info()
                        .title("FHBCK Church Management API")
                        .description("REST API for First Haitian Baptist Church of Kissimmee website content management")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Church Administration")
                                .email("info@fhbck.org")
                                .url("https://fhbck.org"))
                        .license(new License()
                                .name("Private")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer"))
                .components(new Components().addSecuritySchemes("Bearer", securityScheme));
    }
}
