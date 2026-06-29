package com.fhbck.church.repository;

import com.fhbck.church.entity.MediaFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaFileRepository extends JpaRepository<MediaFile, Long> {
    List<MediaFile> findByFileTypeOrderByCreatedAtDesc(String fileType);
}
