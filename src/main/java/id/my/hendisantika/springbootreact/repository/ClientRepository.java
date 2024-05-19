package id.my.hendisantika.springbootreact.repository;

import id.my.hendisantika.springbootreact.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by IntelliJ IDEA.
 * Project : spring-boot-react
 * User: hendisantika
 * Email: hendisantika@gmail.com
 * Telegram : @hendisantika34
 * Date: 5/19/24
 * Time: 08:55
 * To change this template use File | Settings | File Templates.
 */
public interface ClientRepository extends JpaRepository<Client, Long> {
}
