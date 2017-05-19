package com.imp.guestbook.service;

import com.imp.guestbook.entity.Record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service for {@link Record}
 */

public interface RecordService {

    Page<Record> getOrderedRecords(Pageable pageable);

    void saveRecord(Record record);

}
