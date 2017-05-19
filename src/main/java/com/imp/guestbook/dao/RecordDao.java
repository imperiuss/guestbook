package com.imp.guestbook.dao;

import com.imp.guestbook.entity.Record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 *
 */

public interface RecordDao extends PagingAndSortingRepository<Record, Integer> {

    Page<Record> findAllByOrderByIdDesc(Pageable pageable);
}
